export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
}) {
  const base =
    "border-[2.8px] border- rounded-[8px] px-5 py-2 text-base font-medium transition-colors duration-200 cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    outline:
      "border-[2.8px] border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}