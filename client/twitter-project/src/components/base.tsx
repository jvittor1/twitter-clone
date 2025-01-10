interface BaseComponentProps {
  text: string;
  children?: React.ReactNode;
}
export default function BaseComponent({ text, children }: BaseComponentProps) {
  return (
    <div className="flex flex-col items-start justify-center">
      <h1 className="mb-5 text-xl font-bold text-zinc-200">{text}</h1>
      {children}
    </div>
  );
}
