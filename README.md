<h2> Serverless functions </h2> 

The purpose of this project was simple R&D as I'm getting more interested in how DevTools works. I had a full understanding document in place but I dont want that much depth in md file. I have jotted down little bit of info I guess that should align some insight on it.


<br />
<h4>Technical Details: </h4>

Admin Panel -> handles CRUD -> Creates User

User Creates Instances. <= Receives a URL.

User can write an executable function that returns a response on that URL.

<pre>
// Low level example => High level example could be vercel caching whole nextjs SSR pages.
function somethingGood(){
  res.status(200).json({
    message:"ok"
  })
}
</pre>

<br />

<h4>Problems:</h4> 
<ol>
<li>
  If user has multiple Lambdas running, how to manage them on server considering a single port can only be utilized by 1 app.
 <p> <b>Sol.</b> Derived an engine which runs on port 9001, whenever end user hits the URL this engine pushes it in a Queue as a task. The task is picked up 
        by the particular function executed and then response is relayed to end user.</p>
</li> 
  <li>
    Classic race condition problem => what if multiple user hits URL, or multiple execution hits the function at once.
  <p> <b>Sol.</b> Queues. I created a custom Queue instance as it is simple FIFO, would probably add BullMq  sometime in future.</p>
  </li>
  <li>
    Cold starts: A lambda not recently utilized takes significantly longer time to fire response initially.
 <p> <b>Sol.</b> App does Long polling and gradually hits 20 seconds mark if not used for days. If an app is used recently it moves to short polling ie checks every 200ms - 1sec.</p>
  </li>
</ol>

<br />
   <img width="1272" height="617" alt="Svls Functions project" src="https://github.com/user-attachments/assets/2e19ec6d-e4a6-404d-a0cf-668c76a11451" />

