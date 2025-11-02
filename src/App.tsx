import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import backgroundImage from 'figma:asset/6588b114f4565eb55ec7fbbc8afcb17b20c9760e.png';
import dailyPlanImage from 'figma:asset/7fe228e585d0470b14ba8bf9eb2c20bc22eecce3.png';
import stretchImage1 from 'figma:asset/164c8ae363bc4f0058242b4495ba50ab1f2b133e.png';
import stretchImage2 from 'figma:asset/36a18469231728ef5a21b20d53054c3250ac92a2.png';
import exampleImage from 'figma:asset/f1fed3d549a4f582d4901ac491ca464658ca08a8.png';
import newbieImage from 'figma:asset/bdeba98e60c0c2e99f6678ae4bb99041cf79bb1f.png';
import noviceImage from 'figma:asset/c3c938ed2a952286f9815e177f002e1b2c753226.png';
import familiarImage from 'figma:asset/9b854b3f1409ad053e1408b55db30520b1c67402.png';
import advancedImage from 'figma:asset/e5b3c0d204230ad2a028d6b5056a15072e5b522f.png';
import { Eye, EyeOff, Mail, Settings, Bell, Home, Library, TrendingUp, User, ChevronRight, Sun, Moon, Calendar, Check, Play, SlidersHorizontal, LogOut, Shield, HelpCircle, Star, Award, Target, ChevronLeft, Zap, X } from 'lucide-react';

type Screen = 'welcome' | 'login' | 'personalize' | 'stretchLevel' | 'trainingDays' | 'dailyTime' | 'practiceTime' | 'dailyPlan' | 'library' | 'termsOfUse' | 'privacyPolicy' | 'profile' | 'progress';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface PersonalizationData {
  stretchLevel?: 'newbie' | 'novice' | 'familiar' | 'advanced';
  trainingDays?: string[];
  dailyTime?: '10' | '20' | '30' | '45+';
  practiceTime?: 'morning' | 'evening' | 'flexible';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [personalizationData, setPersonalizationData] = useState<PersonalizationData>({});
  const [activeProgressTab, setActiveProgressTab] = useState<'activity' | 'achievements'>('activity');
  const [currentMonth, setCurrentMonth] = useState(8); // September = 8 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate success - randomly decide between new user and returning user  
    const isNewUser = Math.random() > 0.5;
    setCurrentScreen(isNewUser ? 'personalize' : 'dailyPlan');
  };

  // Handle social login
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    // Simulate success - randomly decide between new user and returning user
    const isNewUser = Math.random() > 0.5;
    setCurrentScreen(isNewUser ? 'personalize' : 'dailyPlan');
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on input
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (currentScreen === 'welcome') {
    return (
      <div className="relative h-screen w-full bg-black overflow-hidden">
        {/* Background Image */}
        <ImageWithFallback
          src={backgroundImage}
          alt="Person in yoga pose on mat in bright studio"      
          className="absolute inset-0 w-full h-full object-cover"  
          style={{  
            objectPosition: 'calc(65%) center'
          }}
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-16 pt-0">
          {/* Text Content */}
          <div className="text-center mb-8">
            {/* Welcome Message */}
            <p className="text-white text-base font-normal mb-2 opacity-90">
              Welcome to
            </p>
            
            {/* App Name */}
            <h1 className="text-white text-4xl font-bold mb-12 leading-tight">
              Unwind Yoga
            </h1>
            
            {/* Continue Button */}
            <button 
              onClick={() => setCurrentScreen('login')}
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-200 mb-6 flex items-center justify-center"
            >
              Continue
            </button>
            
            {/* Legal Text */}
            <p className="text-gray-300 text-xs leading-relaxed px-4">
              By tapping Continue, you agree to our{' '}
              <button 
                onClick={() => setCurrentScreen('termsOfUse')}
                className="underline hover:text-white transition-colors"
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button 
                onClick={() => setCurrentScreen('privacyPolicy')}
                className="underline hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              . Please review them before continuing.
            </p>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'login') {
    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-16 pb-12">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors mr-4"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-gray-800 text-2xl font-semibold mb-2">
                Login to Unwind Yoga
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                Continue your journey to mindfulness and health
              </p>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex-1 space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email / Username
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full bg-white/70 border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-300' 
                    : 'border-rose-200 focus:ring-rose-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full bg-white/70 border rounded-lg px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-300' 
                      : 'border-rose-200 focus:ring-rose-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-200 mt-8 flex items-center justify-center"
            >
              Login
            </button>

            {/* Sign Up Button */}
            <button 
              type="button"
              className="w-full bg-white/80 hover:bg-white border border-rose-300 text-rose-500 font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center"
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FCF9F7] text-gray-500">OR</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex space-x-4 mb-6">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 p-3 rounded-full transition-colors duration-200 flex items-center justify-center"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSocialLogin('facebook')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center mb-6">
            <button 
              type="button"
              className="text-rose-500 hover:text-rose-600 font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Legal Text */}
          <div className="text-center">
            <p className="text-gray-500 text-xs leading-relaxed">
              By logging in, you agree to our{' '}
              <button 
                onClick={() => setCurrentScreen('termsOfUse')}
                className="text-rose-500 hover:text-rose-600 underline"
              >
                Terms of Use
              </button>{' '}
              and{' '}
              <button 
                onClick={() => setCurrentScreen('privacyPolicy')}
                className="text-rose-500 hover:text-rose-600 underline"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'dailyPlan') {
    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-800 text-xl font-medium">
              Good evening!
            </h1>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentScreen('profile')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowNotificationDialog(true)}
                className={`p-2 rounded-full transition-colors ${
                  notificationsEnabled 
                    ? 'bg-rose-100 hover:bg-rose-200' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Bell className={`w-5 h-5 ${
                  notificationsEnabled ? 'text-rose-500' : 'text-gray-600'
                }`} />
              </button>
            </div>
          </div>

          {/* Daily Session Card */}
          <div className="relative bg-black rounded-3xl p-6 mb-8 overflow-hidden">
            {/* Background pattern or image could go here */}
            <div className="relative z-10">
              <h2 className="text-white text-2xl font-semibold mb-2">
                Your Daily<br />Session
              </h2>
              <p className="text-white/80 text-base mb-8">
                15 min
              </p>
              
              <div className="flex justify-end">
                <button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-200 flex items-center justify-center">
                  Start
                </button>
              </div>
            </div>
          </div>

          {/* Browse More Poses */}
          <button 
            onClick={() => setCurrentScreen('library')}
            className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="text-gray-800 font-medium">Browse More Poses</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Notification Permission Dialog */}
        {showNotificationDialog && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 z-30">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800 text-lg font-semibold">
                  Stay on Track
                </h3>
                <button 
                  onClick={() => setShowNotificationDialog(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Get gentle reminders for your daily yoga sessions and never miss a practice.
                </p>
                
                <div className="flex items-center space-x-3 p-3 bg-rose-50 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-rose-100 rounded-full">
                    <Bell className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">Daily Reminders</p>
                    <p className="text-gray-600 text-xs">We'll notify you at your preferred practice time</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setNotificationsEnabled(true);
                    setShowNotificationDialog(false);
                  }}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center"
                >
                  Enable Notifications
                </button>
                
                <button 
                  onClick={() => setShowNotificationDialog(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center py-2 text-rose-500">
              <Home className="w-6 h-6 mb-1" fill="currentColor" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Library className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('progress')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <TrendingUp className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Progress</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'stretchLevel') {
    const stretchOptions = [
      {
        id: 'newbie' as const,
        title: 'Newbie',
        description: 'I have never done a stretch exercise.',
        image: newbieImage
      },
      {
        id: 'novice' as const,
        title: 'Novice', 
        description: "I haven't practiced in a long time.",
        image: noviceImage
      },
      {
        id: 'familiar' as const,
        title: 'Familiar',
        description: 'I practice stretching regularly.',
        image: familiarImage
      },
      {
        id: 'advanced' as const,
        title: 'Advanced',
        description: 'I do advanced stretch exercises.',
        image: advancedImage
      }
    ];

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('personalize')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex-1"></div> {/* Spacer */}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-800 text-2xl font-semibold mb-8 px-2">
            Select your stretch level.
          </h1>

          {/* Options Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 mb-8">
            {stretchOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setPersonalizationData(prev => ({ ...prev, stretchLevel: option.id }))}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 ${
                  personalizationData.stretchLevel === option.id
                    ? 'bg-rose-100 border-2 border-rose-300'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3">
                  <ImageWithFallback
                    src={option.image}
                    alt={`${option.title} stretch level`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-gray-800 font-medium mb-2">
                  {option.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => {
              if (personalizationData.stretchLevel) {
                setCurrentScreen('trainingDays');
              }
            }}
            disabled={!personalizationData.stretchLevel}
            className={`w-full py-4 px-8 rounded-full font-medium transition-all duration-200 flex items-center justify-center ${
              personalizationData.stretchLevel
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'trainingDays') {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const selectedDays = personalizationData.trainingDays || [];

    const toggleDay = (day: string) => {
      const currentDays = personalizationData.trainingDays || [];
      const updatedDays = currentDays.includes(day)
        ? currentDays.filter(d => d !== day)
        : [...currentDays, day];
      setPersonalizationData(prev => ({ ...prev, trainingDays: updatedDays }));
    };

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('stretchLevel')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex-1"></div> {/* Spacer */}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-800 text-2xl font-semibold mb-8 px-2">
            When would you like to train?
          </h1>

          {/* Days Grid */}
          <div className="flex-1 grid grid-cols-3 gap-4 mb-8">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`relative flex items-center justify-center p-6 rounded-2xl transition-all duration-200 ${
                  selectedDays.includes(day)
                    ? 'bg-rose-400 border-2 border-rose-400'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`font-medium ${
                  selectedDays.includes(day) ? 'text-white' : 'text-gray-800'
                }`}>
                  {day}
                </span>
                {selectedDays.includes(day) && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => {
              if (selectedDays.length > 0) {
                setCurrentScreen('dailyTime');
              }
            }}
            disabled={selectedDays.length === 0}
            className={`w-full py-4 px-8 rounded-full font-medium transition-all duration-200 flex items-center justify-center ${
              selectedDays.length > 0
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'dailyTime') {
    const timeOptions = [
      { id: '10' as const, label: '10 minutes' },
      { id: '20' as const, label: '20 minutes' },
      { id: '30' as const, label: '30 minutes' },
      { id: '45+' as const, label: '45+ minutes' }
    ];

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('trainingDays')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex-1"></div> {/* Spacer */}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-800 text-2xl font-semibold mb-8 px-2">
            How much time can you spend daily?
          </h1>

          {/* Options List */}
          <div className="flex-1 space-y-4 mb-8">
            {timeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setPersonalizationData(prev => ({ ...prev, dailyTime: option.id }))}
                className={`w-full flex items-center justify-center p-6 rounded-2xl transition-all duration-200 ${
                  personalizationData.dailyTime === option.id
                    ? 'bg-rose-100 border-2 border-rose-300'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-gray-800 font-medium">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <button 
            onClick={() => {
              if (personalizationData.dailyTime) {
                setCurrentScreen('practiceTime');
              }
            }}
            disabled={!personalizationData.dailyTime}
            className={`w-full py-4 px-8 rounded-full font-medium transition-all duration-200 flex items-center justify-center ${
              personalizationData.dailyTime
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'practiceTime') {
    const practiceOptions = [
      { id: 'morning' as const, label: 'Morning', icon: Sun },
      { id: 'evening' as const, label: 'Evening', icon: Moon },
      { id: 'flexible' as const, label: 'Flexible Schedule', icon: Calendar }
    ];

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => setCurrentScreen('dailyTime')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <div className="flex-1"></div> {/* Spacer */}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
              <div className="w-16 h-1 bg-rose-400 rounded-full"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-gray-800 text-2xl font-semibold mb-8 px-2">
            What time of day do you prefer to practice yoga?
          </h1>

          {/* Options List */}
          <div className="flex-1 space-y-4 mb-8">
            {practiceOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setPersonalizationData(prev => ({ ...prev, practiceTime: option.id }))}
                  className={`w-full flex items-center justify-center p-6 rounded-2xl transition-all duration-200 ${
                    personalizationData.practiceTime === option.id
                      ? 'bg-rose-100 border-2 border-rose-300'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-gray-600 mr-4" />
                    <span className="text-gray-800 font-medium">
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Finish Button */}
          <button 
            onClick={() => {
              if (personalizationData.practiceTime) {
                setCurrentScreen('dailyPlan');
              }
            }}
            disabled={!personalizationData.practiceTime}
            className={`w-full py-4 px-8 rounded-full font-medium transition-all duration-200 flex items-center justify-center ${
              personalizationData.practiceTime
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Finish
          </button>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-800 text-2xl font-semibold">
              Profile
            </h1>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Profile Info Card */}
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              
              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-gray-800 text-xl font-semibold mb-1">
                  Sarah Johnson
                </h2>
                <p className="text-gray-600 text-sm">
                  Member since June 2024
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-rose-100 rounded-full mx-auto mb-2">
                  <Target className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-gray-800 font-semibold">24</p>
                <p className="text-gray-600 text-xs">Sessions</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-rose-100 rounded-full mx-auto mb-2">
                  <Award className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-gray-800 font-semibold">7</p>
                <p className="text-gray-600 text-xs">Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-rose-100 rounded-full mx-auto mb-2">
                  <Star className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-gray-800 font-semibold">12h</p>
                <p className="text-gray-600 text-xs">Total Time</p>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="flex-1 space-y-2">
            {/* Account Settings */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Account Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Notifications */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Privacy */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Privacy & Security</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Help & Support */}
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Help & Support</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Terms of Use */}
            <button 
              onClick={() => setCurrentScreen('termsOfUse')}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Terms of Use</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Privacy Policy */}
            <button 
              onClick={() => setCurrentScreen('privacyPolicy')}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-gray-800 font-medium">Privacy Policy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            {/* Logout */}
            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors mt-4"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full mr-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-red-500 font-medium">Logout</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setCurrentScreen('dailyPlan')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Library className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('progress')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <TrendingUp className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Progress</span>
            </button>
            <button className="flex flex-col items-center py-2 text-rose-500">
              <User className="w-6 h-6 mb-1" fill="currentColor" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'progress') {
    // Helper functions for calendar
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const navigateMonth = (direction: 'prev' | 'next') => {
      if (direction === 'prev') {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear(currentYear - 1);
        } else {
          setCurrentMonth(currentMonth - 1);
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear(currentYear + 1);
        } else {
          setCurrentMonth(currentMonth + 1);
        }
      }
    };

    // Get days in month and starting day
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Create calendar grid
    const calendarDays = [];
    
    // Previous month days (grayed out)
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isActive: false
      });
    }
    
    // Current month days
    const activeDays = [18, 19, 20, 21, 26, 28]; // Example workout days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        isCurrentMonth: true,
        isActive: activeDays.includes(day)
      });
    }
    
    // Next month days to fill the grid
    const remainingSlots = 42 - calendarDays.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingSlots; day++) {
      calendarDays.push({
        day,
        isCurrentMonth: false,
        isActive: false
      });
    }

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-20">
          {/* Tabs */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setActiveProgressTab('activity')}
              className={`relative pb-2 mr-8 transition-colors ${
                activeProgressTab === 'activity' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              <span className="font-medium">Activity</span>
              {activeProgressTab === 'activity' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveProgressTab('achievements')}
              className={`relative pb-2 transition-colors ${
                activeProgressTab === 'achievements' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              <span className="font-medium">Achievements</span>
              {activeProgressTab === 'achievements' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500 rounded-full"></div>
              )}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeProgressTab === 'activity' && (
              <div className="space-y-6">
                {/* Weekly Goal Circle */}
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-48 h-48">
                    {/* Progress Ring */}
                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                      {/* Background ring */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress ring - 0/5 so no progress */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="8"
                        strokeDasharray={`0 ${2 * Math.PI * 45}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-gray-800 text-4xl font-semibold">0/5</span>
                      <span className="text-gray-600 text-sm mt-1">Weekly Goal</span>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {/* Lifetime Sessions */}
                  <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-gray-800 text-2xl font-semibold mb-1">56</p>
                    <p className="text-gray-600 text-sm leading-tight">
                      Lifetime exercise<br />sessions
                    </p>
                  </div>

                  {/* Weekly Goal Streak */}
                  <div className="bg-white rounded-2xl p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3">
                      <Zap className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="text-gray-800 text-2xl font-semibold mb-1">0</p>
                    <p className="text-gray-600 text-sm leading-tight">
                      Weekly goal<br />streak
                    </p>
                  </div>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button 
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-gray-800 text-xl font-semibold">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <button 
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Week/Month Toggle */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gray-200 rounded-full p-1 flex">
                    <button
                      onClick={() => setViewMode('week')}
                      className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                        viewMode === 'week'
                          ? 'bg-gray-600 text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setViewMode('month')}
                      className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
                        viewMode === 'month'
                          ? 'bg-gray-600 text-white'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Month
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-2xl p-4">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center text-gray-600 text-sm font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((calendarDay, index) => (
                      <button
                        key={index}
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                          !calendarDay.isCurrentMonth
                            ? 'text-gray-300'
                            : calendarDay.isActive
                            ? 'bg-green-500 text-white font-medium'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {calendarDay.day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeProgressTab === 'achievements' && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-gray-800 text-lg font-semibold mb-2">
                    Achievements Coming Soon
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Complete more sessions to unlock achievements and badges.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setCurrentScreen('dailyPlan')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Library className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button className="flex flex-col items-center py-2 text-rose-500">
              <TrendingUp className="w-6 h-6 mb-1" fill="currentColor" />
              <span className="text-xs font-medium">Progress</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'library') {
    const yogaPoses = [
      {
        id: 1,
        name: 'Mountain Pose',
        image: exampleImage,
        duration: '2 min'
      },
      {
        id: 2,
        name: 'Warrior II',
        image: exampleImage,
        duration: '3 min'
      },
      {
        id: 3,
        name: 'Tree Pose',
        image: exampleImage,
        duration: '2 min'
      },
      {
        id: 4,
        name: 'Downward Dog',
        image: exampleImage,
        duration: '3 min'
      },
      {
        id: 5,
        name: 'Child\'s Pose',
        image: exampleImage,
        duration: '2 min'
      },
      {
        id: 6,
        name: 'Sun Salutation',
        image: exampleImage,
        duration: '5 min'
      },
      {
        id: 7,
        name: 'Cobra Pose',
        image: exampleImage,
        duration: '2 min'
      },
      {
        id: 8,
        name: 'Triangle Pose',
        image: exampleImage,
        duration: '3 min'
      }
    ];

    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-gray-800 text-2xl font-semibold">
              Library
            </h1>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Yoga Poses List */}
          <div className="flex-1 space-y-4">
            {yogaPoses.map((pose) => (
              <div
                key={pose.id}
                className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
              >
                {/* Background Image */}
                <ImageWithFallback
                  src={pose.image}
                  alt={`${pose.name} yoga pose`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex items-end justify-between p-4">
                  {/* Pose Name */}
                  <div className="flex flex-col">
                    <h3 className="text-white font-medium">
                      {pose.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {pose.duration}
                    </p>
                  </div>
                  
                  {/* Play Button */}
                  <button className="flex items-center justify-center w-10 h-10 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Play className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
          <div className="flex items-center justify-around">
            <button 
              onClick={() => setCurrentScreen('dailyPlan')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center py-2 text-rose-500">
              <Library className="w-6 h-6 mb-1" fill="currentColor" />
              <span className="text-xs font-medium">Library</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('progress')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <TrendingUp className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Progress</span>
            </button>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="flex flex-col items-center py-2 text-gray-400 hover:text-gray-600"
            >
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'termsOfUse') {
    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <h1 className="text-gray-800 text-xl font-semibold">
              Terms of Use
            </h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">1. Acceptance of Terms</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                By accessing and using Unwind Yoga mobile application, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">2. Description of Service</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unwind Yoga provides personalized yoga and stretching routines, meditation guidance, and wellness tracking features through our mobile application.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">3. User Responsibilities</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Users are responsible for consulting with healthcare professionals before beginning any exercise program. Practice at your own risk and within your physical limitations.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">4. Intellectual Property</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                All content, including videos, audio, text, and images, are the intellectual property of Unwind Yoga and are protected by copyright laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">5. Limitation of Liability</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Unwind Yoga shall not be liable for any injuries or damages arising from the use of this application or following the provided exercises.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">6. Updates to Terms</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We reserve the right to update these terms at any time. Users will be notified of significant changes through the application.
              </p>
            </div>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  if (currentScreen === 'privacyPolicy') {
    return (
      <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setCurrentScreen('welcome')}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
            </button>
            <h1 className="text-gray-800 text-xl font-semibold">
              Privacy Policy
            </h1>
            <div className="w-9"></div> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto space-y-6">
            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">Information We Collect</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, complete your profile, or contact us for support.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">How We Use Your Information</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, personalize your experience, and communicate with you.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">Information Sharing</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">Data Security</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">Your Rights</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold">Contact Us</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@unwindyoga.com.
              </p>
            </div>
          </div>
        </div>

        {/* iOS-style home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
      </div>
    );
  }

  // Personalization Screen
  return (
    <div className="relative h-screen w-full bg-[#FCF9F7] overflow-hidden">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-6 pt-12 pb-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => setCurrentScreen('login')}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
          </button>
          <div className="flex-1"></div> {/* Spacer */}
        </div>

        {/* Header Content */}
        <div className="flex-1 flex flex-col justify-center text-center">
          <h1 className="text-gray-800 text-2xl font-semibold mb-4 leading-tight">
            Let's Personalize Your Plan
          </h1>
          <p className="text-gray-600 text-base leading-relaxed px-4">
            Just a few quick questions to tailor a yoga schedule perfect for you.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="space-y-6">
          <button 
            onClick={() => setCurrentScreen('stretchLevel')}
            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-200 flex items-center justify-center"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* iOS-style home indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/30 rounded-full"></div>
    </div>
  );
}