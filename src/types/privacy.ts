export type PrivacyAPICategory = {
  id: string;
  name: string;
  description: string;
  examples: string[];
  documentation: string;
};

export const PRIVACY_API_TYPES: PrivacyAPICategory[] = [
  {
    id: "NSPrivacyAccessedAPITypeFileTimestamp",
    name: "File Timestamps",
    description: "Access to file creation and modification dates",
    examples: ["File metadata access", "Last modified date retrieval"],
    documentation: "https://developer.apple.com/documentation/bundleresources/privacy_manifest_keys/nsapplicationaccessedapitype/nsapplicationaccessedapitypefiletimestamp"
  },
  {
    id: "NSPrivacyAccessedAPITypeLocation",
    name: "Location",
    description: "Access to device location services",
    examples: ["GPS coordinates", "Geolocation services"],
    documentation: "https://developer.apple.com/documentation/bundleresources/privacy_manifest_keys/nsapplicationaccessedapitype/nsapplicationaccessedapitypelocation"
  },
  {
    id: "NSPrivacyAccessedAPITypePhotoLibrary",
    name: "Photo Library",
    description: "Access to the device's photo library",
    examples: ["Photo access", "Image library management"],
    documentation: "https://developer.apple.com/documentation/bundleresources/privacy_manifest_keys/nsapplicationaccessedapitype/nsapplicationaccessedapitypephotolibrary"
  },
  // Add more API types as needed
]; 