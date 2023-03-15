import React from 'react'

const HeaderController = ({setTransactions, setIsSubscribed, isSubscribed}) => {
    const handleStart = () => {
        setIsSubscribed(true);
    };

    const handleStop = () => {
        setIsSubscribed(false);
    };

    const handleReset = () => {
        setTransactions((prev) => [])
        setIsSubscribed(false);
    };
    return (
        <>
        <h1>Unconfirmed Bitcoin Transactions</h1>
            <div className='buttons_block'>
                <button disabled={isSubscribed} onClick={handleStart}>
                    Start
                </button>
                <button disabled={!isSubscribed} onClick={handleStop}>
                    Stop
                </button>
                <button
                    disabled={isSubscribed}
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </>
    )
}

export default HeaderController