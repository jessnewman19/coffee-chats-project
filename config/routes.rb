Rails.application.routes.draw do
  resources :meetings
  resources :professionals
  resources :users
  resources :industries

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  post '/login', to: 'sessions#create'
  delete '/logout', to: "sessions#destroy"

  # Leave to deploy app to Heroku
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
