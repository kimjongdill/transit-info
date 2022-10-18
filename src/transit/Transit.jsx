import { useEffect, useState, React } from 'react';

const TransitTile = ({destination, time}) => {
    return (
        <div style={{backgroundColor: 'blue', width: '80%', padding: '2%'}}>
            <div style={{float: 'left', textAlign: 'left'}}>{destination}</div>
            <div style={{float: 'right', textAlign: 'right'}}>{time}</div>
        </div>
    )
}

const ConditionallyRender = ({shouldRender, children}) => {
    if(!shouldRender) return null;
    return children;
}

const Transit = () => {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [error, setError] = useState(false);
    const [loadCounter, setLoadCounter] = useState(0);

    const busses = result?.bus ?? [];
    const trains = result?.train ?? [];

    useEffect(() => {
        setLoading(true);
        setError(false);
        setResult();
        
        const getInfo = async () => {
            try {
                console.log(`${loadCounter} transit loading...`);
                const rawResult = await fetch('/transitinfo');
                const json = await rawResult.json();
                setResult(json);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
            
        }
        getInfo();
    }, [loadCounter]);

    return (
        <>
            <h1>Nearby Transit Times</h1>
            <button onClick={() => setLoadCounter(x => x + 1)}>Refresh</button>
            <ConditionallyRender shouldRender={loading}>
                Loading
            </ConditionallyRender>
            <ConditionallyRender shouldRender={error}>
                Error, try again. 
            </ConditionallyRender>
            <ConditionallyRender shouldRender={!loading && !error}>
                <h2>Busses</h2>
                {
                    busses.map( (bus) => <TransitTile destination={bus.destination} time={bus.predictedTime} />)
                }
                <h2>Trains</h2>
                {
                    trains.map( (train) => <TransitTile destination={train.destination} time={train.predictedTime} />)
                }
                <br />
            </ConditionallyRender>
            <button onClick={() => setLoadCounter(x => x + 1)}>Refresh</button>
        </>
    )
}

export default Transit;