type CardProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Card = ({ title, description, children }: CardProps) => {
  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/50 sm:p-5">
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h2 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h2>}
          {description && (
            <p className="text-xs text-slate-600 sm:text-sm">{description}</p>
          )}
        </header>
      )}
      <div className="flex-1">{children}</div>
    </section>
  );
};

export default Card;


