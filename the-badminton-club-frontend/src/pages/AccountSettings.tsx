// src/pages/AccountSettings.tsx
import { useState } from "react";

type Tab = "profile" | "security" | "notifications" | "privacy";

type EmailNotifications = {
  bookingConfirmations: boolean;
  sessionReminders: boolean;
  cancellationConfirmations: boolean;
  waitlistUpdates: boolean;
  promotionalOffers: boolean;
  weeklyDigest: boolean;
};

type SMSNotifications = {
  waitlistSpot: boolean;
  sessionReminder1h: boolean;
  lastMinuteOpenings: boolean;
};

type PushNotifications = {
  waitlistUpdates: boolean;
  sessionStartingSoon: boolean;
};

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile mock state
  const [displayName, setDisplayName] = useState("John");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234-567-8901");
  const [emergencyContact, setEmergencyContact] = useState("Jane Doe - +1 234-567-8902");

  // Notifications mock state
  const [emailNotifications, setEmailNotifications] = useState<EmailNotifications>({
    bookingConfirmations: true,
    sessionReminders: true,
    cancellationConfirmations: true,
    waitlistUpdates: true,
    promotionalOffers: false,
    weeklyDigest: false,
  });

  const [smsNotifications, setSmsNotifications] = useState<SMSNotifications>({
    waitlistSpot: true,
    sessionReminder1h: true,
    lastMinuteOpenings: false,
  });

  const [pushNotifications, setPushNotifications] = useState<PushNotifications>({
    waitlistUpdates: true,
    sessionStartingSoon: true,
  });

  // Privacy mock state
  const [profileVisibility, setProfileVisibility] = useState<"Public" | "Friends Only" | "Private">("Public");
  const [friendsSeeBookings, setFriendsSeeBookings] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "security", label: "Security" },
    { key: "notifications", label: "Notifications" },
    { key: "privacy", label: "Privacy" },
  ];

  return (
    <div className="container mx-auto px-6 py-12 flex gap-8">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-xl shadow p-4 flex flex-col gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 p-3 rounded-lg font-semibold transition-colors duration-200 w-full text-left ${
              activeTab === tab.key
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <>
            <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: "Display Name", value: displayName, setter: setDisplayName, type: "text" },
                { label: "Email Address", value: email, setter: setEmail, type: "email" },
                { label: "Phone Number", value: phone, setter: setPhone, type: "text" },
                { label: "Emergency Contact", value: emergencyContact, setter: setEmergencyContact, type: "text" },
              ].map(field => (
                <div className="flex flex-col" key={field.label}>
                  <label className="text-gray-700 font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    className="mt-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>
            <button className="mt-4 w-40 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
              Save Changes
            </button>
          </>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2">Security Settings</h2>

            {/* Password */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <span className="font-semibold">Password</span>
              <span className="text-gray-500 text-sm">Last changed 3 months ago</span>
              <button className="mt-2 px-4 py-2 bg-gray-100 rounded-lg font-medium hover:bg-gray-200">
                Change Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center">
              <div>
                <span className="font-semibold">Two-Factor Authentication</span>
                <p className="text-gray-500 text-sm">
                  Add an extra layer of security to your account
                </p>
              </div>
              <input type="checkbox" className="toggle toggle-primary" />
            </div>

            {/* Active Sessions */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
              <span className="font-semibold">Active Sessions</span>
              <div className="flex justify-between items-center">
                <div>
                  <p>Chrome on Mac</p>
                  <span className="text-gray-500 text-sm">Current session</span>
                </div>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg text-xs">Active</span>
              </div>
              <button className="mt-2 text-red-600 hover:underline text-sm">
                Sign out all other sessions
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Notification Preferences</h2>

            {/* Email Notifications */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <span className="font-semibold">Email Notifications</span>
              {(Object.keys(emailNotifications) as (keyof EmailNotifications)[]).map(key => (
                <div key={key} className="flex justify-between items-center">
                  <span>{key}</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={emailNotifications[key]}
                    onChange={() =>
                      setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }))
                    }
                  />
                </div>
              ))}
            </div>

            {/* SMS Notifications */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <span className="font-semibold">SMS Notifications</span>
              {(Object.keys(smsNotifications) as (keyof SMSNotifications)[]).map(key => (
                <div key={key} className="flex justify-between items-center">
                  <span>{key}</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={smsNotifications[key]}
                    onChange={() =>
                      setSmsNotifications(prev => ({ ...prev, [key]: !prev[key] }))
                    }
                  />
                </div>
              ))}
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <span className="font-semibold">Push Notifications</span>
              {(Object.keys(pushNotifications) as (keyof PushNotifications)[]).map(key => (
                <div key={key} className="flex justify-between items-center">
                  <span>{key}</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={pushNotifications[key]}
                    onChange={() =>
                      setPushNotifications(prev => ({ ...prev, [key]: !prev[key] }))
                    }
                  />
                </div>
              ))}
            </div>

            <button className="mt-4 w-40 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
              Save Preferences
            </button>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Privacy Settings</h2>

            <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <span>Profile Visibility</span>
              <select
                className="border rounded-lg px-3 py-1"
                value={profileVisibility}
                onChange={e =>
                  setProfileVisibility(e.target.value as "Public" | "Friends Only" | "Private")
                }
              >
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <span>Allow friends to see my bookings</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={friendsSeeBookings}
                onChange={() => setFriendsSeeBookings(prev => !prev)}
              />
            </div>

            <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <span>Marketing Consent</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={marketingConsent}
                onChange={() => setMarketingConsent(prev => !prev)}
              />
            </div>

            <button className="mt-4 w-40 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200">
              Save Privacy
            </button>
          </div>
        )}

      </div>
    </div>
  );
}