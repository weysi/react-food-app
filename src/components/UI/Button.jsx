export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? `text-button ${className}` : "button";

  cssClasses += " " + className;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
