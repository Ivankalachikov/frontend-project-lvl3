const renderModal = ({ title, description, link }) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLink = document.querySelector('.modal-footer a.btn');
  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalLink.setAttribute('href', link);
};

const renderFeedback = (error, i18n, type = 'success') => {
  const feedbackText = error.key ? i18n.t(error.key, { error: error.error }) : i18n.t(error);
  const feedbackEl = document.querySelector('.feedback');
  const addedClass = `text-${type}`;
  feedbackEl.textContent = feedbackText;
  feedbackEl.classList.remove('text-success', 'text-danger');
  feedbackEl.classList.add(addedClass);
};

const renderFeeds = (feeds, i18n) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';
  const feedsTitle = document.createElement('h2');
  feedsTitle.textContent = i18n.t('ui.feedsTitle');
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-5');

  feeds.forEach(({ data }) => {
    const { title, description } = data;
    const feedItem = document.createElement('li');
    feedItem.classList.add('list-group-item');
    const feedItemTitle = document.createElement('h3');
    feedItemTitle.textContent = title;
    const feedItemDescription = document.createElement('p');
    feedItemDescription.textContent = description;
    feedItem.appendChild(feedItemTitle);
    feedItem.appendChild(feedItemDescription);
    feedsList.appendChild(feedItem);
  });
  const fragment = document.createDocumentFragment();
  fragment.appendChild(feedsTitle);
  fragment.appendChild(feedsList);
  feedsContainer.appendChild(fragment);
};

const renderPosts = (posts, openedPostsIds, i18n) => {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  const postsTitle = document.createElement('h2');
  const postsList = document.createElement('ul');
  postsTitle.textContent = i18n.t('ui.postsTitle');
  postsList.classList.add('list-group');

  posts.forEach(({
    id, title, link,
  }) => {
    const isOpened = openedPostsIds.includes(id);
    const postItem = document.createElement('li');
    postItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

    const postItemLink = document.createElement('a');
    postItemLink.setAttribute('href', link);
    postItemLink.setAttribute('target', '_blank');
    postItemLink.setAttribute('rel', 'noopener noreferrer');
    postItemLink.dataset.id = id;
    const linkClass = isOpened ? 'font-weight-normal' : 'font-weight-bold';
    postItemLink.classList.add(linkClass);
    postItemLink.textContent = title;

    const postItemButton = document.createElement('button');
    postItemButton.setAttribute('type', 'button');
    postItemButton.classList.add('btn', 'btn-primary', 'btn-sm');
    postItemButton.textContent = i18n.t('ui.previewButton');
    postItemButton.dataset.id = id;
    postItemButton.dataset.toggle = 'modal';
    postItemButton.dataset.target = '#modal';

    postItem.appendChild(postItemLink);
    postItem.appendChild(postItemButton);
    postsList.appendChild(postItem);
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(postsTitle);
  fragment.appendChild(postsList);
  postsContainer.appendChild(fragment);
};

export {
  renderModal, renderFeeds, renderPosts, renderFeedback,
};
