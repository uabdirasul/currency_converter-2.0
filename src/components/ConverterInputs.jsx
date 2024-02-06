import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import CurrencyFlag from "react-currency-flags";
import PulseLoader from "react-spinners/PulseLoader";

// Data
import currencies from "../currencies.js";

const ConverterInputs = () => {
  const [rightFlag, setRightFlag] = useState("UZS");
  const [leftFlag, setLeftFlag] = useState("USD");
  const [currencyAmount, setCurrencyAmount] = useState(1000);

  const fetchData = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/a5dc311114291d2aec24ac45/pair/${leftFlag}/${rightFlag}/${currencyAmount}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const queryClient = new QueryClient();
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["currency"],
    queryFn: fetchData,
    enabled: false,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="converter-inputs">
        <div className="left-input">
          <span className="input-small-title">From</span>

          {/* This div contains a select dropdown for selecting a currency along
        with its corresponding flag. */}
          <div className="option-flag">
            <CurrencyFlag currency={leftFlag} size="sm" />
            <select
              value={leftFlag}
              name="from"
              id="from"
              onChange={(e) => {
                setLeftFlag(e.target.value);
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {/* Currency-result */}

          <input
            className="left-result-input result-input"
            type="number"
            defaultValue={currencyAmount}
            onChange={(e) => {
              setCurrencyAmount(e.target.value);
            }}
            onKeyDown={() => {
              refetch();
            }}
          />
        </div>
        <div className="right-input">
          <span className="input-small-title">To</span>

          {/* This div contains a select dropdown for selecting a currency along
        with its corresponding flag. */}
          <div className="option-flag">
            <CurrencyFlag currency={rightFlag} size="sm" />
            <select
              value={rightFlag}
              name="from"
              id="from"
              onChange={(e) => {
                setRightFlag(e.target.value);
              }}
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {isFetching ? (
            <PulseLoader color="#36d7b7" />
          ) : (
            <p>{data?.result ? data.conversion_result : 0}</p>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default ConverterInputs;
