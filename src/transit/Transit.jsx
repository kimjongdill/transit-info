import { useEffect, useState, React } from 'react';
import { useParams } from 'react-router-dom';
import { SlGhost } from 'react-icons/sl';

const URL = 'https://api.georgedill.net';
// const URL = 'http://0.0.0.0:8787'

const TransitTile = ({destination, time, isGhost}) => {
    return (
        <div style={{backgroundColor: 'blue', width: '80%', padding: '2%'}}>
            <div style={{float: 'left', textAlign: 'left'}}>
                {destination}
            </div>
            <div style={{float: 'right', textAlign: 'right'}}>
                {`${time} `}
                {isGhost && <SlGhost />}
            </div>
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

    const { key } = useParams();
    const request = `${URL}?key=${key}`;

    const busses = result?.bus ?? [];
    const trains = result?.train ?? [];

    useEffect(() => {
        setLoading(true);
        setError(false);
        setResult();
        
        const getInfo = async () => {
            
            try {
                const rawResult = await fetch(request);
                const json = await rawResult.json();
                setResult(json);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
            
        }
        getInfo();
    }, [loadCounter, request]);

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
                <h2>Buses</h2>
                {
                    busses.map( (bus) => <TransitTile destination={bus.destination} time={bus.predictedTime} />)
                }
                <h2>Trains</h2>
                {
                    trains.map( (train) => <TransitTile destination={train.destination} time={train.predictedTime} isGhost={train.isGhost} />)
                }
                <br />
            </ConditionallyRender>
            <button onClick={() => setLoadCounter(x => x + 1)}>Refresh</button>
        </>
    )
}

export default Transit;