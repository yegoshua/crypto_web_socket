import React, { useEffect, useState } from 'react';
import HeaderController from './components/HeaderController';
import "./assets/css/Table.css"
import TransactionList from './components/TransactionList';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    return (
        <div className='centered'>
            <HeaderController
                setIsSubscribed={setIsSubscribed}
                setTransactions={setTransactions}
                isSubscribed={isSubscribed}
            />
            <TransactionList 
                isSubscribed={isSubscribed} 
                transactions={transactions} 
                setTransactions={setTransactions}
            />
        </div>
    );
}

export default App;