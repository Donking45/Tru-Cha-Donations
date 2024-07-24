import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  console.log('Fetching data for id:', params.charitypage);
  const res = await fetch(`/charity/${params.charitypage}`);
  
  if (!res.ok) {
    console.error('Failed to fetch:', res.statusText);
    return {
      status: res.status,
      error: new Error('Failed to load charity data')
    };
  }

  const data = await res.json();


  return {
    info: data
  };
};
