const randomNames = ['Sandra', 'Slađana', 'Mateo', 'Marko', 'Dražen', 'Veronika', 'Valerij', 'Kristijan', 'Ivica', 'Hrvoje', 'Filip', 'Boris', 'Velimir' ]; 
const randomColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#FFC0CB' ]; 
const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

const drone = new Scaledrone('an2wHUKsVQT8mDvW', {
  data: {name: randomName, color: randomColor},
});

drone.on('open', error => {
  if (error) return console.error(error);
  console.log('Successfully connected to Scaledrone');
});

const room = drone.subscribe('observable-room');

room.on('open', error => {
  if (error) return console.error(error);
  console.log('Successfully joined room');
});

room.on('data', (text, member) => {
  const messageElement = document.createElement('div');
  messageElement.style.color = member.clientData.color;
  messageElement.textContent = `${member.clientData.name}: ${text}`;
  document.getElementById('messageContainer').appendChild(messageElement);
});

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

const responses = [
  'Dobar dan, kako Vam mogu pomoći?',
  'Nažalost nemam informacije o tome.',
  'Danas je sunčano sa mogućnošču kiše.',
  'Molim Vas ponovite pitanje',
  'Vaša poruka je poslana.',
  'Javljam se uskoro s odgovorom',
  'Želim Vam ugodan dan!', 
  'Kako ste?',
  'Test',
];

function sendMessage() {
  const message = document.getElementById('messageInput').value;
  if (!message) return;
  drone.publish({
    room: 'observable-room',
    message,
  });
  document.getElementById('messageInput').value = '';

  setTimeout(() => {
    const chatbotMessage = responses[Math.floor(Math.random() * responses.length)];
    const chatbotMessageElement = document.createElement('div');
    chatbotMessageElement.style.color = 'black';
    chatbotMessageElement.textContent = `ChatAplikacija: ${chatbotMessage}`;
    document.getElementById('messageContainer').appendChild(chatbotMessageElement);
  }, 1000);
}
