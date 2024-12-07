const database = firebase.database();

function updateNestedData(path, updates, callback) {
  database.ref(path).transaction(currentData => {
    if (currentData === null) {
      return updates; // Handle case where data does not exist yet
    }
    // Optimistic locking: Check if data has changed since last read
    if (JSON.stringify(currentData) !== JSON.stringify(updates)) {
      console.log('Data has changed. Retrying...'); 
      return; // Retry by returning undefined
    } 
    return {...currentData, ...updates};
  }, (error, committed, snapshot) => {
    if (error) {
      console.error('Transaction failed:', error);
      callback(error);
    } else if (!committed) {
      console.log('Transaction aborted. Retrying...'); 
      updateNestedData(path, updates, callback); // Retry the update
    } else {
      console.log('Transaction committed successfully!');
      callback(null, snapshot.val());
    }
  });
}

// Example Usage
const path = '/users/uid/profile';
const updates = {
  name: 'John Doe',
  age: 30,
};

updateNestedData(path, updates, (error, data) => {
  if (error) {
    console.error('Error updating data:', error);
  } else {
    console.log('Data updated successfully:', data);
  }
});