import React, { useState, useEffect } from "react";
import '../Styles/filter.css';
import axios from "axios";
import navHook from './navHook'; // If this HOC is necessary

const Filter = ({ navigate }) => {
    const [locations, setLocations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState(undefined);
    const [lcost, setLcost] = useState(undefined);
    const [hcost, setHcost] = useState(undefined);
    const [sort, setSort] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Fetch locations and restaurants data
        axios.get('http://localhost:5500/location')
            .then(res => setLocations(res.data.loc))
            .catch(err => console.log(err));

        axios.post('http://localhost:5500/filter')
            .then(res => setRestaurants(res.data.restaurants))
            .catch(err => console.log(err));


    }, []);

    const handleLocationChange = (event) => {
        const location = event.target.value;
        filterRestaurants({ location, lcost, hcost, sort, page });
    };

    const handleSortChange = (sort) => {
        filterRestaurants({ location, lcost, hcost, sort, page });
    };

    const handlePageChange = (page) => {
        filterRestaurants({ location, lcost, hcost, sort, page });
    };

    const handleCostChange = (lcost, hcost) => {
        filterRestaurants({ location, lcost, hcost, sort, page });
    };

    const filterRestaurants = (filterobj) => {
        axios.post('http://localhost:5500/filter', filterobj)
            .then(res => setRestaurants(res.data.restaurants))
            .catch(err => console.log(err));
    };

    const handleNavigate = (id) => {
        navigate(`/resDetails?restaurant=${id}`);
    };


    const handleGoHome = () => {
        navigate('/');
    };
    const isFilterPage = window.location.pathname.startsWith('/filter');
    const navbarStyle = isFilterPage ? { backgroundColor: '#dc3545' } : { backgroundColor: 'transparent' };

    return (
        <div>

            <button onClick={handleGoHome} className="btn btn-outline-primary mb-3">Go Back to Homepage</button>

            <div className="container mt-3 mb-4">
                <h1 className="h4 mb-4">Breakfast Places in Mumbai</h1>
                <button id="filter-btn" className="btn btn-light btn-outline-dark d-lg-none">Filters / Sort</button>

                <div className="row">
                    <div className="col-lg-4 col-md-5 mb-4" id="filters">
                        <div className="card border-0 rounded-0">
                            <div className="card-body">
                                <h4 className="card-title mb-1">Filters</h4>
                                <p className="card-subtitle mb-2">Select Location</p>
                                <select name="location" id="filter-select" className="form-select" onChange={handleLocationChange}>
                                    <option value="0" disabled selected>Please type a location</option>
                                    {locations.map((item) => (
                                        <option key={item.city_id} value={item.city_id}>{`${item.name}`}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Cuisine</h4>
                                <div><input type="checkbox" name="cuisines" /> North Indian</div>
                                <div><input type="checkbox" name="cuisines" checked /> South Indian</div>
                                <div><input type="checkbox" name="cuisines" checked /> Chinese</div>
                                <div><input type="checkbox" name="cuisines" /> Fast Food</div>
                                <div><input type="checkbox" name="cuisines" /> Street Food</div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Cost For Two</h4>
                                <div><input type="radio" name="cost" onChange={() => handleCostChange(1, 500)} /> Less than ₹500</div>
                                <div><input type="radio" name="cost" onChange={() => handleCostChange(500, 1000)} /> ₹500 to ₹1000</div>
                                <div><input type="radio" name="cost" onChange={() => handleCostChange(1000, 1500)} /> ₹1000 to ₹1500</div>
                                <div><input type="radio" name="cost" onChange={() => handleCostChange(1500, 2000)} /> ₹1500 to ₹2000</div>
                                <div><input type="radio" name="cost" onChange={() => handleCostChange(2000, 5000)} /> ₹2000+</div>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Sort</h4>
                                <div><input type="radio" name="sort" onChange={() => handleSortChange(1)} /> Price low to high</div>
                                <div><input type="radio" name="sort" onChange={() => handleSortChange(-1)} /> Price high to low</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-7" id="RESTAURANT">
                        <div className="row mb-4">
                            {restaurants.length !== 0 ?
                                restaurants.map((each, index) => (
                                    <div className="col-12 mb-3" key={index} onClick={() => handleNavigate(each._id)}>
                                        <div className="card border-0">
                                            <div className="row g-0">
                                                <div className="col-md-3 col-4">
                                                    <img src={each.thumb} className="img-fluid rounded-start mt-3 ms-3" alt="Restaurant Thumbnail" />
                                                </div>
                                                <div className="col-md-9 col-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{each.name}</h5>
                                                        <p className="card-text fw-bold text-muted">{each.locality}</p>
                                                        <p className="card-text">{each.address}</p>
                                                    </div>
                                                    <hr className="mb-0" />
                                                    <div className="d-flex justify-content-between px-3 text-muted">
                                                        <p className="mb-0">CUISINES: {each.Cuisine.map((item) => `${item.name}`).join(', ')}</p>
                                                        <p className="mb-0">COST FOR TWO: ₹{each.cost}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="text-secondary fs-4 text-center">Sorry, no restaurants match your criteria.</div>
                            }
                        </div>

                        <div className="col-12 text-center">
                            <button className="btn btn-outline-dark mx-1" onClick={() => handlePageChange(1)}>1</button>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handlePageChange(2)}>2</button>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handlePageChange(3)}>3</button>
                            <button className="btn btn-outline-dark mx-1" onClick={() => handlePageChange(4)}>4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default navHook(Filter); // Apply HOC if necessary

// import React from "react";
// import '../Styles/filter.css';
// import axios from "axios";
// import Navbar from './Navbar'; // Import Navbar
// import navHook from './navHook';

// class Filter extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             locations: [],
//             restaurants: [],
//             location: undefined,
//             lcost: undefined,
//             hcost: undefined,
//             sort: 1,
//             page: 1,
//             isLoggedIn: false,
//             userName: '',
//             userProfilePic: ''
//         };
//     }

//     componentDidMount() {
//         // Fetch locations and restaurants data
//         axios.get('http://localhost:5500/location')
//             .then(res => this.setState({ locations: res.data.loc }))
//             .catch(err => console.log(err));

//         axios.post('http://localhost:5500/filter')
//             .then(res => this.setState({ restaurants: res.data.restaurants }))
//             .catch(err => console.log(err));

//         // Check for authentication and user details
//         const token = localStorage.getItem('authToken');
//         const userName = localStorage.getItem('userName');
//         const userProfilePic = localStorage.getItem('userProfilePic');

//         if (token && userName) {
//             this.setState({
//                 isLoggedIn: true,
//                 userName,
//                 userProfilePic: userProfilePic || './assets/default-profile.png'
//             });
//         }
//     }

//     handleLocationChange = (event) => {
//         const location = event.target.value;
//         const { sort, lcost, hcost, page } = this.state;
//         this.filterRestaurants({ location, lcost, hcost, sort, page });
//     }

//     handleSortChange = (sort) => {
//         const { location, lcost, hcost, page } = this.state;
//         this.filterRestaurants({ location, lcost, hcost, sort, page });
//     }

//     handlePageChange = (page) => {
//         const { location, sort, lcost, hcost } = this.state;
//         this.filterRestaurants({ location, lcost, hcost, sort, page });
//     }

//     handleCostChange = (lcost, hcost) => {
//         const { location, sort, page } = this.state;
//         this.filterRestaurants({ location, lcost, hcost, sort, page });
//     }

//     filterRestaurants = (filterobj) => {
//         axios.post('http://localhost:5500/filter', filterobj)
//             .then(res => this.setState({ restaurants: res.data.restaurants, ...filterobj }))
//             .catch(err => console.log(err));
//     }

//     handleNavigate = (id) => {
//         this.props.navigate(`/resDetails?restaurant=${id}`);
//     }

//     handleLogout = () => {
//         // Clear user data from localStorage
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userName');
//         localStorage.removeItem('userProfilePic');

//         // Update the state
//         this.setState({
//             isLoggedIn: false,
//             userName: '',
//             userProfilePic: ''
//         });

//         // Navigate to the home page
//         this.props.navigate('/');
//     };

//     render() {
//         const { locations, restaurants, isLoggedIn, userName, userProfilePic } = this.state;

//         // Determine if the current route is '/filter' and apply the bg-danger class accordingly
//         const isFilterPage = window.location.pathname.startsWith('/filter');
//         const navbarStyle = isFilterPage ? { backgroundColor: '#dc3545' } : { backgroundColor: 'transparent' };


//         return (
//             <div>
//                 <Navbar
//                     isLoggedIn={isLoggedIn}
//                     userName={userName}
//                     userProfilePic={userProfilePic}
//                     navbarClass={navbarStyle} // Pass the className for the Navbar
//                     onLogout={this.handleLogout} // Pass handleLogout to Navbar
//                 />

//                 <div className="container mt-3 mb-4">
//                     <h1 className="h4 mb-4">Breakfast Places in Mumbai</h1>
//                     <button id="filter-btn" className="btn btn-light btn-outline-dark d-lg-none">Filters / Sort</button>

//                     <div className="row">
//                         <div className="col-lg-4 col-md-5 mb-4" id="filters">
//                             <div className="card border-0 rounded-0">
//                                 <div className="card-body">
//                                     <h4 className="card-title mb-1">Filters</h4>
//                                     <p className="card-subtitle mb-2">Select Location</p>
//                                     <select name="location" id="filter-select" className="form-select" onChange={this.handleLocationChange}>
//                                         <option value="0" disabled selected>Please type a location</option>
//                                         {locations.map((item) => (
//                                             <option key={item.city_id} value={item.city_id}>{`${item.name}`}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="card-body">
//                                     <h4 className="card-title">Cuisine</h4>
//                                     <div><input type="checkbox" name="cuisines" /> North Indian</div>
//                                     <div><input type="checkbox" name="cuisines" checked /> South Indian</div>
//                                     <div><input type="checkbox" name="cuisines" checked /> Chinese</div>
//                                     <div><input type="checkbox" name="cuisines" /> Fast Food</div>
//                                     <div><input type="checkbox" name="cuisines" /> Street Food</div>
//                                 </div>
//                                 <div className="card-body">
//                                     <h4 className="card-title">Cost For Two</h4>
//                                     <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} /> Less than ₹500</div>
//                                     <div><input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} /> ₹500 to ₹1000</div>
//                                     <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} /> ₹1000 to ₹1500</div>
//                                     <div><input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} /> ₹1500 to ₹2000</div>
//                                     <div><input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 5000)} /> ₹2000+</div>
//                                 </div>
//                                 <div className="card-body">
//                                     <h4 className="card-title">Sort</h4>
//                                     <div><input type="radio" name="sort" onChange={() => this.handleSortChange(1)} /> Price low to high</div>
//                                     <div><input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} /> Price high to low</div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-lg-8 col-md-7" id="RESTAURANT">
//                             <div className="row mb-4">
//                                 {restaurants.length !== 0 ?
//                                     restaurants.map((each, index) => (
//                                         <div className="col-12 mb-3" key={index} onClick={() => this.handleNavigate(each._id)}>
//                                             <div className="card border-0">
//                                                 <div className="row g-0">
//                                                     <div className="col-md-3 col-4">
//                                                         <img src={each.thumb} className="img-fluid rounded-start mt-3 ms-3" alt="Restaurant Thumbnail" />
//                                                     </div>
//                                                     <div className="col-md-9 col-8">
//                                                         <div className="card-body">
//                                                             <h5 className="card-title">{each.name}</h5>
//                                                             <p className="card-text fw-bold text-muted">{each.locality}</p>
//                                                             <p className="card-text">{each.address}</p>
//                                                         </div>
//                                                         <hr className="mb-0" />
//                                                         <div className="d-flex justify-content-between px-3 text-muted">
//                                                             <p className="mb-0">CUISINES: {each.Cuisine.map((item) => `${item.name}`).join(', ')}</p>
//                                                             <p className="mb-0">COST FOR TWO: ₹{each.cost}</p>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                     :
//                                     <div className="text-secondary fs-4 text-center">Sorry, no restaurants match your criteria.</div>
//                                 }
//                             </div>

//                             <div className="col-12 text-center">
//                                 <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(1)}>1</button>
//                                 <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(2)}>2</button>
//                                 <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(3)}>3</button>
//                                 <button className="btn btn-outline-dark mx-1" onClick={() => this.handlePageChange(4)}>4</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }

// export default navHook(Filter);
