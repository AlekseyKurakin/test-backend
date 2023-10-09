1. We can check file extension and depends on that use different functions for parsing
2. We should be calling for this web api from service and work with the response same as we work with body of request we got
3. If we need to get bank rates for calculation then we should call endpoints that they provided in cron jobs once a day and then store them in our db (i think its better then calling them everytime when we get api request)
4. We can cache values and then just return them, it will take less time than this big query that i had to write
