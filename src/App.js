import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("1");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [convertedCur, setConvertedCur] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      setIsLoading(true);
      async function letsconvert() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConvertedCur(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setConvertedCur(amount);
      letsconvert();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />

      <select
        disabled={isLoading}
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        disabled={isLoading}
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>
        {amount} {fromCur} is {convertedCur} {toCur}
      </p>
    </div>
  );
}

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

// export default function App() {
//   return (
//     <div>
//       <input type="text" />
//       <select>
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <select>
//         <option value="USD">USD</option>
//         <option value="EUR">EUR</option>
//         <option value="CAD">CAD</option>
//         <option value="INR">INR</option>
//       </select>
//       <p>OUTPUT</p>
//     </div>
//   );
// }
