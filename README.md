# Streamly video sharing and streaming website


<img width="1366" height="768" alt="Screenshot (40)" src="https://github.com/user-attachments/assets/e2aed554-635e-4bd8-96fd-97b0b249a9f3" />


<img width="1366" height="768" alt="Screenshot (49)" src="https://github.com/user-attachments/assets/572b9c9b-6f73-485f-adbd-49671445feb1" />


<img width="1366" height="768" alt="Screenshot (50)" src="https://github.com/user-attachments/assets/3856b63f-406a-4e07-8705-1abe92938d63" />


<img width="1366" height="768" alt="Screenshot (51)" src="https://github.com/user-attachments/assets/3e93896d-56a1-477f-a9fa-f2915a66b963" />


<img width="1366" height="768" alt="Screenshot (52)" src="https://github.com/user-attachments/assets/8de28255-34c2-46b1-8349-3f36c1f41b29" />



clone the project `git clone https://github.com/ezdev21/video-sharing`

## Client Installation

navigate to client directory `cd client`

install node dependencies `npm install`

run in development mode `npm run dev`

## Server Installation

install and configure postgres database

navigate to server directory: `cd server`

create .env file run: `cp .env.example .env`

setup credentials in the .env file from postgres database and JWT_SECRET

install node dependencies: `npm install`

run in development mode: `npm run dev`

Generate the Prisma Client: `npx prisma generate`

migrate the prisma database `npx prisma migrate dev`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License.

<!-- CONTACT -->
## Contact
Contact me here or by email ezradev21@gmail.com

## Support
If this project helped you, please consider leaving a ⭐ on the repository. It helps others discover the project and motivates future development.
