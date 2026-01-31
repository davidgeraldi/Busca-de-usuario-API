import { baseUrl, eventsQuantity } from "../variables.js";

async function getEvents(userName) {
  const response = await fetch(`${baseUrl}${userName}/events`);
  const events = await response.json();
  console.log(events);
  return events;
}

async function filterEvents(userName) {
  try {
    const events = await getEvents(userName);

    const eventPush = events.filter(
      (event) => event.type === "PushEvent"
    ).slice(0, eventsQuantity);
    
    const eventCreate = events.filter(
      (event) => event.type === "CreateEvent"
    ).slice(0, eventsQuantity);

    if (eventPush.length === 0 && eventCreate.length === 0) {
      return;
    }

    const allEvents = [...eventPush, ...eventCreate];
    
    let eventsHtml = '';

    allEvents.forEach((event) => {
      const eventType = event.type === "PushEvent" ? "Push" : "Create";
      eventsHtml += `<li>${event.repo.name} --> ${eventType}</li>`;
    });

    document.querySelector(".profile-data").innerHTML += `
      <div class="events">
        <ul class="list">
          ${eventsHtml}
        </ul>
      </div>
    `;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  }
}

export { getEvents, filterEvents };
