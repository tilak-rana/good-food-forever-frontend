import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/homepage.css";
import Banner from "./Homepage_banner";
import QuickSearch from "./Homepage_Quicksearch";

const Home = () => {
    const [location, setLocation] = useState([]);
    const [mealtypes, setMealtypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch location and mealtypes data
        const fetchData = async () => {
            try {
                const [locationRes, mealtypeRes] = await axios.all([
                    axios.get("http://localhost:5500/location", {
                        headers: { "Content-Type": "application/JSON" },
                    }),
                    axios.get("http://localhost:5500/mealtype", {
                        headers: { "Content-Type": "application/JSON" },
                    }),
                ]);

                setLocation(locationRes.data.loc);
                setMealtypes(mealtypeRes.data.mealtype);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only on mount

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Banner locationData={location} />
            <QuickSearch mealtypeData={mealtypes} />
        </div>
    );
};

export default Home;

// import React from "react";
// import axios from "axios";
// import '../Styles/homepage.css';
// import Banner from './Homepage_banner';
// import QuickSearch from './Homepage_Quicksearch';

// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             location: [],
//             mealtypes: [],
//             isLoading: true,
//             error: null
//         };
//     }

//     componentDidMount() {
//         // Fetch location and mealtypes data
//         axios.all([
//             axios.get('http://localhost:5500/location', { headers: { 'Content-Type': 'application/JSON' } }),
//             axios.get('http://localhost:5500/mealtype', { headers: { 'Content-Type': 'application/JSON' } })
//         ])
//         .then(axios.spread((locationRes, mealtypeRes) => {
//             this.setState({
//                 location: locationRes.data.loc,
//                 mealtypes: mealtypeRes.data.mealtype,
//                 isLoading: false
//             });
//         }))
//         .catch((err) => {
//             console.error(err);
//             this.setState({ error: 'Failed to fetch data', isLoading: false });
//         });
//     }

//     render() {
//         const { location, mealtypes, isLoading, error } = this.state;

//         if (isLoading) {
//             return <div>Loading...</div>;
//         }

//         if (error) {
//             return <div>{error}</div>;
//         }

//         return (
//             <div>
//                 <Banner locationData={location} />
//                 <QuickSearch mealtypeData={mealtypes} />
//             </div>
//         );
//     }
// }

// export default Home;
