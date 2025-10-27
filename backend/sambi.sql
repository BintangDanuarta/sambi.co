create table conversations
(
    id         int auto_increment
        primary key,
    created_at timestamp default CURRENT_TIMESTAMP not null
);

create table roles
(
    id   int auto_increment
        primary key,
    role enum ('mahasiswa', 'client') not null
);

create table user
(
    id            int auto_increment
        primary key,
    roles_id      int                                 not null comment 'buat user.role',
    nama          varchar(100)                        not null,
    jenis_kelamin enum ('L', 'P')                     null,
    email         varchar(100)                        not null,
    password      varchar(255)                        not null,
    foto_profil   varchar(255)                        null comment 'buat foto',
    bio           text                                null,
    created_at    timestamp default CURRENT_TIMESTAMP not null,
    updated_at    timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint uq_user_email
        unique (email),
    constraint fk_user_roles
        foreign key (roles_id) references roles (id)
            on update cascade
);

create table conversation_users
(
    conversation_id int not null,
    user_id         int not null,
    primary key (conversation_id, user_id),
    constraint fk_conv_conv
        foreign key (conversation_id) references conversations (id)
            on update cascade on delete cascade,
    constraint fk_conv_user
        foreign key (user_id) references user (id)
            on update cascade on delete cascade
);

create index idx_conv_user
    on conversation_users (user_id);

create table messages
(
    id              int auto_increment
        primary key,
    conversation_id int                                 not null,
    sender_id       int                                 not null,
    body            text                                not null,
    created_at      timestamp default CURRENT_TIMESTAMP not null,
    constraint fk_msg_conv
        foreign key (conversation_id) references conversations (id)
            on update cascade on delete cascade,
    constraint fk_msg_sender
        foreign key (sender_id) references user (id)
            on update cascade on delete cascade
);

create index idx_messages_conv
    on messages (conversation_id);

create index idx_messages_sender
    on messages (sender_id);

create table notifications
(
    id         int auto_increment
        primary key,
    user_id    int                                  not null,
    type       varchar(50)                          not null,
    title      varchar(191)                         null,
    body       text                                 null,
    data       json                                 null,
    is_read    tinyint(1) default 0                 not null,
    created_at timestamp  default CURRENT_TIMESTAMP not null,
    constraint fk_notifications_user
        foreign key (user_id) references user (id)
            on update cascade on delete cascade
);

create index idx_notifications_user
    on notifications (user_id, is_read);

create table projects
(
    id           int auto_increment
        primary key,
    nama_project varchar(100)                        null,
    deskripsi    text                                null,
    budget       decimal(12, 2)                      null,
    deadline     date                                null,
    user_id      int                                 null,
    status       enum ('ditangani', 'selesai')       null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_at   timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    constraint fk_projects_user
        foreign key (user_id) references user (id)
            on update cascade on delete set null
);

create table project_applications
(
    id           int auto_increment
        primary key,
    project_id   int                                                                not null,
    user_id      int                                                                not null,
    cover_letter text                                                               null,
    status       enum ('applied', 'accepted', 'rejected') default 'applied'         not null,
    created_at   timestamp                                default CURRENT_TIMESTAMP not null,
    constraint fk_pa_project
        foreign key (project_id) references projects (id)
            on update cascade on delete cascade,
    constraint fk_pa_user
        foreign key (user_id) references user (id)
            on update cascade on delete cascade
);

create index idx_pa_project
    on project_applications (project_id);

create index idx_pa_user
    on project_applications (user_id);

create index idx_projects_status
    on projects (status);

create index idx_projects_user_id
    on projects (user_id);

create table ratings
(
    id         int auto_increment
        primary key,
    user_id    int                                 null,
    project_id int                                 null,
    rating     int                                 not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    constraint fk_ratings_project
        foreign key (project_id) references projects (id)
            on update cascade on delete set null,
    constraint fk_ratings_user
        foreign key (user_id) references user (id)
            on update cascade on delete set null,
    constraint chk_ratings_range
        check (`rating` between 1 and 5)
);

create index idx_ratings_project_id
    on ratings (project_id);

create index idx_ratings_user_id
    on ratings (user_id);

create index idx_user_roles_id
    on user (roles_id);

create table wallets
(
    id      int auto_increment
        primary key,
    user_id int                         not null,
    balance decimal(14, 2) default 0.00 not null,
    constraint uq_wallet_user
        unique (user_id),
    constraint fk_wallet_user
        foreign key (user_id) references user (id)
            on update cascade on delete cascade
);

create table wallet_transactions
(
    id         int auto_increment
        primary key,
    wallet_id  int                                 not null,
    type       enum ('credit', 'debit')            not null,
    amount     decimal(14, 2)                      not null,
    meta       json                                null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    constraint fk_wt_wallet
        foreign key (wallet_id) references wallets (id)
            on update cascade on delete cascade
);

create index idx_wt_wallet
    on wallet_transactions (wallet_id);

