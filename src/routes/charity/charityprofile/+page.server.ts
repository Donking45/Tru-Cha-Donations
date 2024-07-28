import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
 
  const res = await fetch(`/charity/charityprofile`);
    console.log(res);
  if (!res.ok) {
    console.error('Failed to fetch:', res.statusText);
    return {
      status: res.status,
      error: new Error('Failed to load charity data')
    };
  }

  const data = await res.json();
  console.log(data)
  return {
    info: data
  };
};

