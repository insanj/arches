
# Backend Engineer code challenge
##  What to expect

After submitting code for the exercise, our engineering team will review it and get back to you ASAP for a followup to ask about it, to have a general conversation about programming, and to learn about your technical interests and motivations. 
Our goal is to ensure that we can learn from each other in day-to-day collaboration, and that we will be able to provide you with a stimulating environment that will result in you having a sense of ownership and pride over your contributions to the platform.

## Stack guideline

Our current backend stack is based on Node, Python and PostgreSQL. Please use either Node or Python along with PostgreSQL to build the following feature. Do not use any frameworks or libraries beyond the standard library and a DB driver or query builder. Feel free to use any DB extensions that may be useful.

## Feature description

- Load third party data and persist it in the DB with some particular but different structure. I.e. persisted records would have different key names, data types or nesting than the raw input.
  - Arrange and relate the persisted data into a tree structure with more than one root. E.g. product categories or other simple taxonomy.
  - Some of the data within the persisted records must be structured, and some unstructured. I.e. records have a mix of normalized and arbitrary keys.
- REST API to interact with the data
  - Allows users to fetch single and multiple records. Users can filter the response data by at least one field by specifying it in the request.
  - Allows users to create new single and multiple related records at the same time. No need to support updating or deleting.

Don’t worry about security, migrations or any unnecessary documentation or presentation. 
Feel free to pick any sample data you find interesting. 
It can be loaded from the network or the filesystem. 
The data doesn’t need to be real (it can be made up). 
Feel free to submit the code in whichever way is easiest. 
Please include running instructions and any other special notes.
