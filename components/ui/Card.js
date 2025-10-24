export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'normal',
  ...props 
}) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    normal: 'p-6',
    lg: 'p-8',
  }
  
  const hoverStyle = hover ? 'hover:shadow-card-hover cursor-pointer' : ''
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-card transition-shadow ${hoverStyle} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}


