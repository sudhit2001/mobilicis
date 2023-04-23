import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useQuery } from "react-query";


// function getUsers() {
//   return axios
//     .get("http://localhost:3000/api/getAll", {
//       params: {
//         filter: {
//           lastName: { $regex: /^M/ },
//           quote: { $exists: true, $type: "string", $regex: /.{16,}/ },
//           email: { $regex: /M/i },
//         },
//       },
//     })
//     .then((res) => res.data);
// }

function App() {
  const [message1, setMessage1] = useState([]);
  const [message2, setMessage2] = useState([]);
  const [message3, setMessage3] = useState([]);
  const [message4, setMessage4] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getAll").then((response) => {
      const filteredData1 = response.data.filter((item) => {
        return item.income > "$5" && (item.car==="Mercedes-Benz" || item.car==="BMW");
      });
      const filteredData2 = response.data.filter((item) => {
        return parseInt(item.phone_price) > 10000 && item.gender==="Male";
      });
      const filteredData3 = response.data.filter((item) => {
        return item.last_name.startsWith("M") && item.quote.length > 15 && item.email.includes(item.last_name.toLowerCase());
      });
      const filteredData4 = response.data.filter((item) => {
        // return (item.car==="Audi" || item.car==="BMW" || item.car==="Mercedes");
        return (item.car==="Audi" || item.car==="BMW" || item.car==="Mercedes-Benz") && !/\d/i.test(item.email);
      });
      
      const users = response.data;
      const citiesCount = {};
      const incomes = response.data;
      const citiesIncome = {};


      // Map the incomes to users by user ID
      const incomesByUser = {};
      incomes.forEach(income => {
        incomesByUser[income.id] = income;
      });

      // Count the number of users for each city
      users.forEach(user => {
        const city = user.city;
        citiesCount[user.city] = citiesCount[user.city] + 1 || 1;
        const income = incomesByUser[user.id];
        citiesIncome[city] = citiesIncome[city] + parseFloat(income.income.slice(1)) || parseFloat(income.income.slice(1));
      });

      // Sort the cities by the number of users
      const sortedCities = Object.entries(citiesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(city => ({ name: city[0], count: city[1] ,avgIncome: citiesIncome[city[0]] / city[1],}));

      setCities(sortedCities);

      setMessage1(filteredData1);
      setMessage2(filteredData2);
      setMessage3(filteredData3);
      setMessage4(filteredData4);
    });
  }, []);

  // const {message3,isLoading, error } = useQuery("http://localhost:3000/api/getAll", getUsers);

  // if (isLoading) return <div>Loading...</div>;

  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Mobilicis India Private Limited</h1>
      <h2>1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</h2>
      <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Income</th>
        <th>Car</th>
      </tr>
        {message1.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.income}</td>
            <td>{item.car}</td>
          </tr>
        ))}
      </table>
      
      
      {/* <ul>
        {message1.map((item) => (
          <li key={item.first_name}>{item.id}-{item.first_name}</li>
        ))}
      </ul> */}


      <h2>2. Male Users which have phone price greater than 10,000.</h2>

      <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Price</th>
      </tr>
        {message2.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.gender}</td>
            <td>{item.phone_price}</td>
          </tr>
        ))}
      </table>
      
      {/* <ul>
        {message2.map((item) => (
          <li key={item.first_name}>{item.id}-{item.first_name}</li>
          ))}
      </ul> */}


      <h2>3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name</h2>

      <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Quote</th>
        <th>Email</th>
      </tr>
        {message3.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.quote}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>


      {/* <ul>
        {message3.map((user) => (
          <li key={user.first_name}>{user.id}-{user.first_name}</li>
        ))}
      </ul> */}


      <h2>4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</h2>

      <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Car</th>
        <th>Email</th>
      </tr>
        {message4.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.first_name} {item.last_name}</td>
            <td>{item.car}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>

      {/* <ul>
        {message4.map((user) => (
          <li key={user.first_name}>{user.id}-{user.first_name}</li>
        ))}
      </ul> */}


      <h2>5. Show the data of top 10 cities which have the highest number of users and their average income.</h2>

      <table>
      <tr>
        <th>City</th>
        <th>Count</th>
        <th>Average($)</th>
      </tr>
        {cities.map((city) => (
          <tr key={city.name}>
            <td>{city.name}</td>
            <td>{city.count}</td>
            <td>{city.avgIncome.toFixed(3)}</td>
          </tr>
        ))}
      </table>

      {/* <ul>
        {cities.map((city) => (
          <li key={city.name}>{city.name}-{city.count}-{city.avgIncome.toFixed(3)}</li>
        ))}
      </ul> */}


    </div>
  );
}

export default App;
