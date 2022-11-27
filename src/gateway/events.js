const baseUrl = 'https://63375d775327df4c43d370d7.mockapi.io/events';

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
  });
};

export const fetchEvents = () => {
  return fetch(baseUrl).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};

export const deleteEvents = id => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  });
};
