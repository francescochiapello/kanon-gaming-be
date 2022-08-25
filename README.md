# Kanon Gaming BE

## Reference

This API service is written in `NodeJS` using `Typescript` framework.
The repo is on GitHub and the URL is: https://github.com/francescochiapello/kanon-gaming-be

## Clean Architecture

I've written the code of this API following the `Clean Architecture` design pattern.
https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
I think that this `pattern` is one of the most complete and powerful pattern to build world-scale applications.
The concept behind this `architecture` is the dependency rule that has `concentric circles` representing different areas of software.
In general, the further in you go, the higher level the software becomes. The outer circles are `mechanisms`. The inner circles are `policies`.

In the outer layers we have the presentation layer and the interfaces that interact with the outside of the API.
The inner rings represent the controllers that call the use cases. Every actor in this architecture MUST respect the `enterprire business rules` defined in the Core.

## Auth

To develop a complete POC for the questions received I've also added an `authentication layer` that uses the `JWT` technology to authenticate requests.
There are MANY security aspects to increase and to evaluate before a production version of this code of course. This is only for POC purpose. Please, DO NOT use safe passwords to access the system.

## Errors

I've managed errors with `try/catch` returning to the user a message that explain the error. The best solution is to work with SAAS to manage errors such as `Sentry`.

## Testing

I've written two useful tests with `jest` to understand if the external data retrieved from the REST provider are correct or not.

## Tools

All the code of this repository has been written using `eslint` validator for typescript. I've used `husky` + `lintstaged` in order to check up the code before to commit it with typo or others errors.

## Deployment

I've deployed this API Service on my linux server in cloud (Aruba Cloud.it) usign the `docker context` technology.
I've configured NginX as a reverse proxy server in order to communicate with the API service hosten on the machine through an HTTPS session.
I've registered a new A record on my DNS service provider to point to my machine with this URL:
```
kanonapi.chpl.it A 80.211.94.120
```
This is the nginx configuration:
```
root@****:/etc/nginx/sites-available# cat kanonapi.chpl.it 
server {
        server_name kanonapi.chpl.it;
        set $upstream 127.0.0.1:5050;

        location / {
                proxy_pass_header Authorization;
                proxy_pass http://$upstream;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_http_version 1.1;
                proxy_set_header Connection "upgrade";
                proxy_buffering off;
                client_max_body_size 0;
                proxy_read_timeout 36000s;
                proxy_redirect off;
        }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/kanonapi.chpl.it/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/kanonapi.chpl.it/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = kanonapi.chpl.it) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        server_name kanonapi.chpl.it;
    listen 80;
    return 404; # managed by Certbot


}
```
