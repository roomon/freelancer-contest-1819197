const dropdown = document.querySelector(
  '.navbar-item.has-dropdown.is-hoverable'
);
const save = document.getElementById('save');
const edit = document.getElementById('edit');
const notification = document.getElementById('notification');
const editors = [];
save.addEventListener('click', async (event) => {
  const data = editors.map((editor) => editor.getData());
  const response = await fetch('create.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  notification.textContent = (await response.json()).message || 'Oops!';
  notification.classList.remove('is-hidden');
  setTimeout(() => notification.classList.add('is-hidden'), 4444);
});
edit.addEventListener('click', async (event) => {
  const { id } = event.target.dataset;
  const data = editors.map((editor) => editor.getData());
  const response = await fetch(`update.php?id=${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const { message } = await response.json();
  notification.textContent = message || 'Oops!';
  notification.classList.remove('is-hidden');
  setTimeout(() => notification.classList.add('is-hidden'), 4444);
  editors.forEach((editor) => editor.setData(''));
  edit.dataset.id = undefined;
  edit.classList.add('is-hidden');
  save.classList.remove('is-hidden');
});
(async () => {
  try {
    editors.push(
      await ClassicEditor.create(document.getElementById('editor1')),
      await ClassicEditor.create(document.getElementById('editor2')),
      await ClassicEditor.create(document.getElementById('editor3')),
      await ClassicEditor.create(document.getElementById('editor4')),
      await ClassicEditor.create(document.getElementById('editor5')),
      await ClassicEditor.create(document.getElementById('editor6'))
    );
  } catch (error) {
    console.error(error);
  }
})();
(async () => {
  const response = await fetch('fetch.php');
  const { data } = await response.json();
  const wrapper = document.createElement('div');
  wrapper.classList.add('navbar-dropdown');
  data.forEach((id) => {
    const link = document.createElement('a');
    link.classList.add('navbar-item');
    link.textContent = `ID #${id}`;
    link.addEventListener('click', async (event) => {
      const response = await fetch(`show.php?id=${id}`);
      const { message, data } = await response.json();
      notification.textContent = message || 'Oops!';
      notification.classList.remove('is-hidden');
      setTimeout(() => notification.classList.add('is-hidden'), 4444);
      editors[0].setData(data.ParagraphOne);
      editors[1].setData(data.SectionOne);
      editors[2].setData(data.ParagraphTwo);
      editors[3].setData(data.SectionTwo);
      editors[4].setData(data.ParagraphThree);
      editors[5].setData(data.SectionThree);
      save.classList.add('is-hidden');
      edit.classList.remove('is-hidden');
      edit.dataset.id = id;
    });
    wrapper.appendChild(link);
  });
  dropdown.appendChild(wrapper);
})();
