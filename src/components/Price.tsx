interface PriceProps {
  currency: string;
  price: number;
}

export default function Price({ currency, price }: PriceProps) {
  return (
    <>
      {currency}
      <span>
        {' '}
        {Number(price).toLocaleString('my-MY', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </>
  );
}
