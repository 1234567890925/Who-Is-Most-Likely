type Props = {
  text: string;
};

export default function Card({ text }: Props) {
  return (
    <div className="card">
      <p>{text}</p>
    </div>
  );
}
