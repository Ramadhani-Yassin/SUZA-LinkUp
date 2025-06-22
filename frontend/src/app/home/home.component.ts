import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  stagger,
  state,
  keyframes
} from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFadeIn', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('0.5s ease', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('gradientFlow', [
      state('void', style({ backgroundPosition: '0% 50%' })),
      transition('void => *', [
        animate('12s ease', 
          keyframes([
            style({ backgroundPosition: '0% 50%', offset: 0 }),
            style({ backgroundPosition: '100% 50%', offset: 0.5 }),
            style({ backgroundPosition: '0% 50%', offset: 1 })
          ])
        )
      ])
    ]),
    trigger('featureHover', [
      state('normal', style({
        transform: 'translateY(0)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
      })),
      state('hover', style({
        transform: 'translateY(-10px)',
        boxShadow: '0 15px 40px rgba(0,0,0,0.12)'
      })),
      transition('normal => hover', animate('0.3s ease')),
      transition('hover => normal', animate('0.2s ease'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  isDarkTheme = false;
  currentRoute = '';
  hoverState = 'normal';
  currentYear = new Date().getFullYear();

  floatingElements = [
    { size: 100, color: 'rgba(108, 92, 231, 0.1)', top: 20, left: 10, delay: 0 },
    { size: 150, color: 'rgba(0, 206, 201, 0.1)', top: 60, left: 80, delay: 2 },
    { size: 80, color: 'rgba(253, 121, 168, 0.1)', top: 30, left: 50, delay: 4 },
    { size: 120, color: 'rgba(108, 92, 231, 0.1)', top: 70, left: 30, delay: 6 }
  ];

  features = [
    {
      title: 'Collaborative Environment',
      description: 'Engage with peers and instructors in a dynamic academic ecosystem designed for seamless collaboration.',
      image: 'https://img.freepik.com/free-photo/college-students-look-isolated-chroma-key-screen-campus-library_482257-118546.jpg?ga=GA1.1.254434461.1750597024&semt=ais_hybrid&w=740'
    },
    {
      title: 'Course Management',
      description: 'Organize your academic journey with intuitive course tracking, assignments, and progress monitoring.',
      image: 'https://img.freepik.com/premium-photo/training-concept-businessman-hand-holding-training-icon-virtual-screen_1296497-300.jpg?ga=GA1.1.254434461.1750597024&semt=ais_hybrid&w=740'
    },
    {
      title: 'Direct Messaging',
      description: 'Connect instantly with classmates and professors through our integrated communication system.',
      image: 'https://img.freepik.com/premium-photo/sms-spam-fake-text-message-phishing-concept-system-hacked-warning-alert-email-hack-scam-malware-spreading-virus-messages-alert-virtual-mobile-smart-phone-screen-hands-dark-tone_36367-10022.jpg?ga=GA1.1.254434461.1750597024&semt=ais_hybrid&w=740'
    },
    {
      title: 'Personal Dashboard',
      description: 'Your centralized hub for academic progress, calendar integration, and personalized recommendations.',
      image: 'https://img.freepik.com/premium-psd/analytics-dashboard_814202-23.jpg?ga=GA1.1.254434461.1750597024&semt=ais_hybrid&w=740'
    }
  ];

  socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/rm_tech_tz', icon: 'fab fa-twitter' },
    { name: 'Instagram', url: 'https://instagram.com/rm_tech.tz', icon: 'fab fa-instagram' },
    { name: 'LinkedIn', url: 'nuraty', icon: 'fab fa-linkedin' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100087766009297&mibextid=ZbWKwL', icon: 'fab fa-facebook' }
  ];

  quickLinks = [
    { name: 'Home', route: '/home' },
    { name: 'About Us', route: '/about-us' },
    { name: 'Features', route: '/features' },
    { name: 'Contact', route: '/contacts' }
  ];

  legalLinks = [
    { name: 'Terms & Conditions', route: '/terms' },
    { name: 'Privacy Policy', route: '/privacy' },
    { name: 'Cookie Policy', route: '/cookies' }
  ];

  developerProfile = {
    handle: '@nuraty',
    url: 'nuraty'
  };

  get logoPath(): string {
    return this.isDarkTheme 
      ? 'assets/images/suza_connect_light.png' 
      : 'assets/images/suza_connect_transpa_1.png';
  }

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navEnd = event as NavigationEnd;
      this.currentRoute = navEnd.url;
    });
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'dark';
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Can be used for scroll-based animations
  }
}