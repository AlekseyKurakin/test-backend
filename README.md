1. We can check file extension and depends on that use different functions for parsing
2. We just should make a call for api rate in insertDonations() func for that day we have in donation.date field and
specify currency that we need to exchange (for example EUR => USD) 
3. We can create separate endpoint for that, get file that was sent in form-data, 
and work with it same as we work with our file. And we have to add error handling for parser to prevent someting to go wrong
