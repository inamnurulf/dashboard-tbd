import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

type Publisher = {
  "Publisher Name": string;
  City: string;
  Country: string;
  Telephone: string;
  "Year Founded": number;
};

type PublishersProps = {
  publishers: Publisher[];
};

const PublishersPage: React.FC<PublishersProps> = ({ publishers: initialPublishers }) => {
    const [publishers, setPublishers] = useState<Publisher[]>(initialPublishers);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/publishers');
          if (response.ok) {
            const data = await response.json();
            setPublishers(data);
          } else {
            console.error('Failed to fetch publishers:', response.status);
          }
        } catch (error) {
          console.error('Failed to fetch publishers:', error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
      <h1>Publishers</h1>
      <table>
        <thead>
          <tr>
            <th>Publisher Name</th>
            <th>City</th>
            <th>Country</th>
            <th>Telephone</th>
            <th>Year Founded</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher, index) => (
            <tr key={index}>
              <td>{publisher["Publisher Name"]}</td>
              <td>{publisher.City}</td>
              <td>{publisher.Country}</td>
              <td>{publisher.Telephone}</td>
              <td>{publisher["Year Founded"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PublishersProps> = async () => {
  // Fetch the JSON data from the database or API
  const publishersData = [
    {
      "Publisher Name": "HarperCollins",
      City: "New York",
      Country: "United States",
      Telephone: "+1 1234567890",
      "Year Founded": 1817
    }
  ];

  // Map the data to the required format
  const publishers: Publisher[] = publishersData.map(publisher => ({
    "Publisher Name": publisher["Publisher Name"],
    City: publisher.City,
    Country: publisher.Country,
    Telephone: publisher.Telephone,
    "Year Founded": publisher["Year Founded"]
  }));

  return {
    props: {
      publishers
    }
  };
};

export default PublishersPage;
