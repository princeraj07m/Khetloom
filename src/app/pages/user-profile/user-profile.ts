import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService, User } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { Collapse } from 'bootstrap';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  activeSection = 'farm-details';
  private userSubscription?: Subscription;
  currentUser: User | null = null;

  // User profile data - will be loaded from auth service
  userProfile = {
    name: '',
    farmId: '',
    contact: '',
    email: '',
    profileImage: 'https://via.placeholder.com/150x150/28a745/ffffff?text=AG'
  };

  // Farm details
  farmDetails = {
    farmName: 'Green Acres',
    location: 'Meadowshire, USA',
    size: 150,
    primaryCrop: 'Corn, Soybeans',
    secondaryCrop: 'Wheat'
  };

  // Equipment info
  equipmentInfo = {
    sprayerType: 'Boom Sprayer',
    iotDevices: 'Soil Sensors, Drones',
    machinery: 'Tractor, Combine Harvester'
  };

  // Pesticide & Fertilizer
  pesticideInfo = {
    pesticides: 'Glyphosate',
    fertilizerType: 'Conventional',
    monthlyExpenditure: 5000
  };

  // Subscription info
  subscription = {
    plan: 'Pro Farmer Plan',
    renewsOn: '24th July 2024',
    features: [
      'Advanced Crop Analytics',
      'Automated Pest Detection',
      'Priority Support'
    ]
  };

  // Payment details
  paymentDetails = {
    cardType: 'Visa',
    lastFour: '1234',
    expires: '12/2026'
  };

  // Form groups
  personalInfoForm!: FormGroup;
  farmInfoForm!: FormGroup;
  equipmentForm!: FormGroup;
  pesticideForm!: FormGroup;

  // Preferences
  preferences = {
    language: 'English',
    theme: 'light',
    notifications: {
      email: true,
      sms: false,
      inApp: true
    },
    measurementUnits: 'Imperial (acres, lbs)'
  };

  // Integrations
  integrations = [
    { name: 'Weather API', status: 'Connected', action: 'Unlink' },
    { name: 'Market Data Provider', status: 'Connected', action: 'Unlink' },
    { name: 'AgriTools Suite', status: 'Not Connected', action: 'Link Account' }
  ];

  // Security settings
  security = {
    twoFactorEnabled: true
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private toast: ToastService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.subscribeToUserChanges();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private subscribeToUserChanges(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserDataFromAuth(user);
      }
    });
  }

  initializeForms(): void {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phoneNumber: ['', Validators.required],
      communicationPreference: ['Email Only'],
      language: ['English']
    });

    this.farmInfoForm = this.fb.group({
      farmName: ['', Validators.required],
      farmLocation: ['', Validators.required],
      farmSize: ['', Validators.required],
      primaryCrops: [''],
      secondaryCrops: ['']
    });

    this.equipmentForm = this.fb.group({
      sprayerType: [''],
      iotDevices: [''],
      machinery: ['']
    });

    this.pesticideForm = this.fb.group({
      pesticides: [''],
      fertilizerType: [''],
      monthlyExpenditure: ['']
    });
  }

  loadUserData(): void {
    // Load from current user if available
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loadUserDataFromAuth(user);
    } else {
      // Fallback to default data
      this.loadDefaultData();
    }
  }

  private loadUserDataFromAuth(user: User): void {
    // Update user profile display
    this.userProfile = {
      name: user.fullName || '',
      farmId: user._id ? user._id.substring(0, 8).toUpperCase() : 'N/A',
      contact: user.phone || '',
      email: user.email || '',
      profileImage: 'https://via.placeholder.com/150x150/28a745/ffffff?text=' + (user.fullName?.charAt(0) || 'U')
    };

    // Update farm details
    this.farmDetails = {
      farmName: user.farmName || 'Not specified',
      location: user.farmLocation || 'Not specified',
      size: user.farmSize || 0,
      primaryCrop: user.primaryCrops ? user.primaryCrops.join(', ') : 'Not specified',
      secondaryCrop: user.secondaryCrops ? user.secondaryCrops.join(', ') : 'Not specified'
    };

    // Update equipment info
    this.equipmentInfo = {
      sprayerType: user.sprayerType || 'Not specified',
      iotDevices: user.iotDevices ? user.iotDevices.join(', ') : 'Not specified',
      machinery: user.machinery ? user.machinery.join(', ') : 'Not specified'
    };

    // Update pesticide info
    this.pesticideInfo = {
      pesticides: user.pesticides ? user.pesticides.map(p => p.name).join(', ') : 'Not specified',
      fertilizerType: user.fertilizerPreference || 'Not specified',
      monthlyExpenditure: user.monthlyExpenditure || 0
    };

    // Update preferences
    this.preferences = {
      language: user.language || 'English',
      theme: 'light',
      notifications: {
        email: true,
        sms: false,
        inApp: true
      },
      measurementUnits: 'Imperial (acres, lbs)'
    };

    // Update forms with real data
    this.personalInfoForm.patchValue({
      fullName: user.fullName || '',
      email: user.email || '',
      phoneNumber: user.phone || '',
      communicationPreference: user.communication || 'Email Only',
      language: user.language || 'English'
    });

    this.farmInfoForm.patchValue({
      farmName: user.farmName || '',
      farmLocation: user.farmLocation || '',
      farmSize: user.farmSize || '',
      primaryCrops: user.primaryCrops ? user.primaryCrops.join(', ') : '',
      secondaryCrops: user.secondaryCrops ? user.secondaryCrops.join(', ') : ''
    });

    this.equipmentForm.patchValue({
      sprayerType: user.sprayerType || '',
      iotDevices: user.iotDevices ? user.iotDevices.join(', ') : '',
      machinery: user.machinery ? user.machinery.join(', ') : ''
    });

    this.pesticideForm.patchValue({
      pesticides: user.pesticides ? user.pesticides.map(p => p.name).join(', ') : '',
      fertilizerType: user.fertilizerPreference || '',
      monthlyExpenditure: user.monthlyExpenditure || ''
    });
  }

  private loadDefaultData(): void {
    // Fallback to default data if no user is logged in
    this.personalInfoForm.patchValue({
      fullName: this.userProfile.name,
      email: this.userProfile.email,
      phoneNumber: this.userProfile.contact,
      communicationPreference: 'Email Only',
      language: 'English'
    });

    this.farmInfoForm.patchValue({
      farmName: this.farmDetails.farmName,
      farmLocation: this.farmDetails.location,
      farmSize: this.farmDetails.size,
      primaryCrops: this.farmDetails.primaryCrop,
      secondaryCrops: this.farmDetails.secondaryCrop
    });

    this.equipmentForm.patchValue({
      sprayerType: this.equipmentInfo.sprayerType,
      iotDevices: this.equipmentInfo.iotDevices,
      machinery: this.equipmentInfo.machinery
    });

    this.pesticideForm.patchValue({
      pesticides: this.pesticideInfo.pesticides,
      fertilizerType: this.pesticideInfo.fertilizerType,
      monthlyExpenditure: this.pesticideInfo.monthlyExpenditure
    });
  }


setActiveSection(section: string, event?: Event): void {
  if (event) {
    event.preventDefault();
  }
  this.activeSection = section;

  // Close sidebar ONLY on small screens
  const sidebarMenu = document.getElementById('sidebarMenu');
  if (window.innerWidth < 768 && sidebarMenu?.classList.contains('show')) {
    const bsCollapse = Collapse.getInstance(sidebarMenu);
    bsCollapse?.hide();
  }
}
toggleSidebar(): void {
  const sidebarMenu = document.getElementById('sidebarMenu');
  if (sidebarMenu) {
    const bsCollapse = Collapse.getInstance(sidebarMenu) || new Collapse(sidebarMenu);
    bsCollapse.toggle();
  }
}


  saveChanges(): void {
    if (!this.currentUser) {
      this.toast.show('Please login first to edit your profile', 'error');
      return;
    }

    // Collect all form data
    const personalData = this.personalInfoForm.value;
    const farmData = this.farmInfoForm.value;
    const equipmentData = this.equipmentForm.value;
    const pesticideData = this.pesticideForm.value;

    // Prepare user data for update
    const updatedUser: User = {
      ...this.currentUser,
      fullName: personalData.fullName,
      email: personalData.email,
      phone: personalData.phoneNumber,
      communication: personalData.communicationPreference,
      language: personalData.language,
      farmName: farmData.farmName,
      farmLocation: farmData.farmLocation,
      farmSize: farmData.farmSize,
      primaryCrops: farmData.primaryCrops ? farmData.primaryCrops.split(',').map((crop: string) => crop.trim()) : [],
      secondaryCrops: farmData.secondaryCrops ? farmData.secondaryCrops.split(',').map((crop: string) => crop.trim()) : [],
      sprayerType: equipmentData.sprayerType,
      iotDevices: equipmentData.iotDevices ? equipmentData.iotDevices.split(',').map((device: string) => device.trim()) : [],
      machinery: equipmentData.machinery ? equipmentData.machinery.split(',').map((machine: string) => machine.trim()) : [],
      pesticides: pesticideData.pesticides ? pesticideData.pesticides.split(',').map((p: string) => ({ name: p.trim(), frequency: 'Monthly' })) : [],
      fertilizerPreference: pesticideData.fertilizerType,
      monthlyExpenditure: pesticideData.monthlyExpenditure,
      farmingExperience: this.currentUser.farmingExperience || 'Beginner'
    };

    // Update password if provided
    if (personalData.password) {
      updatedUser.password = personalData.password;
    }

    // Save to backend
    this.authService.updateProfile(updatedUser).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Profile updated successfully');
          this.toast.show('Profile updated successfully!', 'success');
        } else {
          console.error('Profile update failed:', response.message);
          this.toast.show('Failed to update profile: ' + response.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.toast.show('Error updating profile. Please make sure you are logged in and try again.', 'error');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  changePassword(): void {
    console.log('Changing password...');
    // Implement password change logic here
  }

  updatePayment(): void {
    console.log('Updating payment...');
    // Implement payment update logic here
  }

  viewBillingHistory(): void {
    console.log('Viewing billing history...');
    // Implement billing history logic here
  }

  changePlan(): void {
    console.log('Changing plan...');
    // Implement plan change logic here
  }

  toggleTwoFactor(): void {
    this.security.twoFactorEnabled = !this.security.twoFactorEnabled;
  }

  toggleTheme(theme: string): void {
    this.preferences.theme = theme;
  }

  toggleNotification(type: string): void {
    this.preferences.notifications[type as keyof typeof this.preferences.notifications] =
      !this.preferences.notifications[type as keyof typeof this.preferences.notifications];
  }

  handleIntegrationAction(integration: any): void {
    console.log(`${integration.action} ${integration.name}`);
    // Implement integration logic here
  }




}




