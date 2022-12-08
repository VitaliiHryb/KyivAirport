const baseUrl = 'https://api.iev.aero/api/flights';

export const fetchFlights = async date => {
  const res = await fetch(`${baseUrl}/${date}`);
  // console.log(res.json()); // Promise ==> PromiseResult: body: {departure: Array(88), arrival: Array(86)} error: {code: 200}
  if (res.ok) return res.json();
  throw new Error(`Could not fetch, received ${res.status}`);
};
