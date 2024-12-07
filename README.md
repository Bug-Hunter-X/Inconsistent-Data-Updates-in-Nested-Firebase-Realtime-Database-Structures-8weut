# Firebase Realtime Database Race Condition Bug

This repository demonstrates a race condition bug in Firebase's Realtime Database when performing concurrent updates to deeply nested data structures. The bug can lead to data loss or inconsistency under high-concurrency scenarios.  The solution provided implements optimistic locking to prevent these issues.

## Bug Reproduction

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the buggy code using `node nested_update_bug.js`.
4. Observe the inconsistent data updates in the Firebase console. Note the multiple simultaneous attempts to update the database.

## Solution

The solution uses optimistic locking to ensure data consistency.  Before updating a node, the client checks its current value. If the value has changed since the client last read it, the update is rejected, and the client retries with the latest value.

Run the solution code using `node nested_update_solution.js` to see the improved behavior.