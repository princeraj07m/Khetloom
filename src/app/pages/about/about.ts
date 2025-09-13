import { Component, OnInit } from '@angular/core';
import { NgxSwapyComponent } from '@omnedia/ngx-swapy';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About implements OnInit {

  aboutUsImage: string = 'https://tse1.mm.bing.net/th/id/OIP.G5qt9KVK3Oh9i1KXq5sVBQAAAA?pid=Api&P=0&h=180';
  aboutUsText: string = 'Welcome to our innovative platform dedicated to revolutionizing agriculture through technology. We believe in empowering farmers with smart solutions to enhance productivity, optimize resource utilization, and ensure sustainable farming practices. Our commitment extends to fostering a global community of empowered and successful farmers, driving forward a future where technology and agriculture work hand-in-hand for greater yields and a healthier planet.';

  missionTitle: string = 'Our Mission';
  missionText: string = 'Our mission is to bridge the gap between traditional farming and modern technology, providing tools that are easy to use, effective, and accessible to everyone. From real-time crop monitoring to intelligent irrigation systems, we are committed to helping farmers achieve greater yields and a healthier planet.';

  whatWeOfferTitle: string = 'What We Offer';
  features = [
    {
      title: 'AI-powered Plant Health Detection',
      description: 'Farmers can upload leaf images or scan fields using a live camera feed. The system analyzes infection type and severity using AI (or mock for demo).'
    },
    {
      title: 'Smart Sprayer Control (Auto & Manual)',
      description: 'Automatic spraying when infection level crosses a threshold. Manual override for dosage and spray duration with safety checks.'
    },
    {
      title: 'IoT Device Management & Monitoring',
      description: 'Dashboard to view sprayer, sensors, and camera status. Device health: battery %, connectivity, last active time.'
    },
    {
      title: 'Alerts & Notifications System',
      description: 'Real-time alerts for infections, device issues, or unsafe weather conditions. Notifications via dashboard pop-ups and configurable farmer settings.'
    },
    {
      title: 'Analytics & Reports',
      description: 'Charts showing pesticide usage, infection trends, and farm health. Historical logs exportable in CSV/PDF for record-keeping.'
    },
    {
      title: 'Weather-aware Spraying Optimization',
      description: 'Integration of weather data (rain, wind, humidity) to recommend or block spraying. Helps avoid chemical waste and ensures efficient application.'
    }
  ];

  ourCommitmentTitle: string = 'Our Commitment';
  ourCommitmentText: string = 'Join us on this journey towards a smarter, more sustainable future in agriculture! We are constantly evolving, integrating new technologies, and listening to the needs of our farming community to deliver solutions that truly make a difference. Together, we can cultivate a more prosperous and sustainable world.';

  ourVisionTitle: string = 'Our Vision';
  ourVisionText: string = 'To be the leading provider of agricultural technology solutions, fostering a global community of empowered and successful farmers.';

  teamMembers = [
    {
      name: 'Prince Kumar',
      role: 'Lead Developer',
      image: 'https://coin-images.coingecko.com/coins/images/67527/large/IMG_1097.png?1753083744',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    {
      name: 'Rohit Raj',
      role: 'UI/UX Designer',
      image: 'https://preview.redd.it/capy-v0-yedxay3k9zqc1.jpeg?auto=webp&s=f0334d04ffef478e77142ed3a5e2c10ee956a0e6',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith'
    },
    {
      name: 'Shashank',
      role: 'Data Scientist',
      image: 'https://coin-images.coingecko.com/coins/images/50408/large/y1UFAUxp_400x400.jpg?1727664151',
      linkedin: 'https://linkedin.com/in/peterjones',
      github: 'https://github.com/peterjones'
    },
    {
      name: 'Manish Kumar',
      role: 'Marketing Specialist',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJH89Q0SylyDX1hPGuyWsomHwTGIZGG0h_i3s0EXH4omUYNK1kqu3r0PWEOJSz0xGyqFE&usqp=CAU',
      linkedin: 'https://linkedin.com/in/emilywhite',
      github: 'https://github.com/emilywhite'
    },
    {
      name: 'Raunak Kumar',
      role: 'Product Manager',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzfDy-FIb49W1dR_2D1HgGyIEMiCEt-1sOQ&s',
      linkedin: 'https://linkedin.com/in/davidgreen',
      github: 'https://github.com/davidgreen'
    },
    {
      name: 'Raunak Kumar',
      role: 'Product Manager',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzfDy-FIb49W1dR_2D1HgGyIEMiCEt-1sOQ&s',
      linkedin: 'https://linkedin.com/in/davidgreen',
      github: 'https://github.com/davidgreen'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
