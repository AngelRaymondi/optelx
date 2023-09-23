import './jquery-3.7.0.min.js'

const request = (type, url, data) => new Promise((resolve, reject) => {
  $.ajax({
    type,
    url,
    data,
    success: e => resolve(e),
    error: e => reject(e)
  })
});

const form = document.querySelector('form.optelx');
const cmd = document.querySelector('.cmd');
const dir = document.querySelector('#dir');

const print = async (input, dir) => {
  const command = document.createElement('div');
  command.classList.add('command');

  const exec = document.createElement('p');
  exec.classList.add('exec');

  exec.innerText = input;

  const response = document.createElement('div');
  response.classList.add('response');


  command.appendChild(exec)
  command.appendChild(response);

  cmd.appendChild(command);

  cmd.scrollTop = cmd.scrollHeight;

  const res = (await request('GET', '/exec', {
    type: 'cmd',
    data: input,
    dir
  })).trim().split('\n');

  for (const line of res) {
    const p = document.createElement('p');
    p.classList.add('line');

    p.innerText = line;

    response.appendChild(p);
  }

  cmd.scrollTop = cmd.scrollHeight;
}

const userInput = form['data'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = userInput.value;

  print(data, dir.value);
})