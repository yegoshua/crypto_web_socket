import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import WebSocket from 'websocket';
import { satoshiToBtc } from '../helpers';

const TransactionList = ({isSubscribed, transactions, setTransactions}) => {
    useEffect(() => {
        const ws = new window.WebSocket('wss://ws.blockchain.info/inv');
        if (isSubscribed) {
        ws.onopen = () => {
            ws.send(JSON.stringify({ "op": "unconfirmed_sub" }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.op === 'utx') {
                setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    {
                        hash: data.x.hash,
                        amount: data.x.out.reduce(
                            (total, output) => total + output.value,
                            0
                        ),
                        from: data.x.inputs.map(input => input.prev_out.addr),
                        to: data.x.out.map(out=> out.addr),
                    },
                ]);
            }
        };
    }
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ "op": "unconfirmed_unsub" }));
            }
            ws.close();
        };
    }, [isSubscribed]);


    return (
        <>
            <p>Number of transactions: {transactions.length}</p>
            <p>Total sum of transactions: {satoshiToBtc(transactions.reduce((total, output) => total + output.amount,
            0))}</p>
            <table className='Table'>
                <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Sum</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.hash}>
                        <td>{transaction.from.map((address)=> (<p key={nanoid()}>{address}</p>))}</td>
                        <td>{transaction.to.map((address)=> (<p key={nanoid()}>{address}</p>))}</td>
                        <td>{satoshiToBtc(transaction.amount)} BTC</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default TransactionList;
