import React from 'react';
import Table from 'react-bootstrap/Table';

const Activities = ({ activities }: { activities: string[] }) => {
  if (activities.length === 0) {
    return <span>None</span>;
  }
  return (
    <>
      {activities.map((activity, idx) => (
        <span key={`activity-${idx}`}>
          {activity}
          {idx < activities.length - 1 ? ', ' : ''}
        </span>
      ))}
    </>
  );
};

const CreateTable = ({ data }: { data: PriceData[] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Trait</th>
          <th>Name</th>
          <th>Floor Price</th>
          <th>Last 5 Buy Price</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 &&
          data.map((price) => {
            return (
              <tr key={`${price.trait}-${price.name}`}>
                <td>{price.trait}</td>
                <td>{price.name}</td>
                <td>{price.floorPrice || 'None'}</td>
                <td>
                  <Activities activities={price.activities || []} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

const PriceTable = ({ data }: { data: PriceData[] }) => {
  return <CreateTable data={data} />;
};

export default PriceTable;

export type PriceData = {
  trait: string;
  name: string;
  floorPrice?: number;
  activities?: string[];
};
