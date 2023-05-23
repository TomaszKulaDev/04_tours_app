import React, {useEffect, useState} from 'react';
import Loading from "./components/Loading";
import Tours from "./components/Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const removeTour = (id)=>{
       const newTour = tours.filter((tour) => tour.id !== id);
       setTours(newTour)
    }


    const fetchTours = async () => {
        setIsLoading(true)
        // Ustawiamy na przyszłość żeby móc odświeżać liste.
        try {
            const resp = await fetch(url)
            const tours = await resp.json()
            setTours(tours)
        } catch (err) {
            // console.log(` Error ${err}`)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTours()
    }, [])

    if (isLoading) {
        return (
            <main>
                <Loading/>
            </main>
        )
    }

    if (tours.length === 0) {
        return (
            <main>
                <h2>No tours left</h2>
                <button type='button' onClick={()=>fetchTours()}>Refresh</button>
            </main>
        )
    }

    return (
        <Tours  tours={tours} removeTour={removeTour}/>
    );
}
export default App;
