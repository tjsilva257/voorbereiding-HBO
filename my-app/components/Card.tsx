interface CardProps {
  trait: string;
}

export default function Card({ trait }: CardProps) {
  return (
    <div className="card">
      <div className="card-top">
        <p>{trait}</p>
      </div>
      <div className="card-divider"></div>
      <div className="card-bottom">
        <p>{trait}</p>
      </div>
    </div>
  );
}