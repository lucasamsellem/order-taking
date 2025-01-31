type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const getPosition = (): Promise<Position> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => resolve(position),
      (err) => reject(err)
    );
  });

export const whereAmI = async (): Promise<string | undefined> => {
  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;
    const API_KEY = '494d39def9834809886e4cb96e4e0c7d';

    const options = {
      method: 'GET',
      enableHighAccuracy: true,
    };

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${API_KEY}`,
      options
    );

    const data = await res.json();
    return data.features[0]?.properties.city;
  } catch (error) {
    console.log(error);
  }
};
