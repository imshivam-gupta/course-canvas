import {twMerge} from "tailwind-merge"
import {ClassValue, clsx} from "clsx";


export const navRoutes = [
  {
    name: "Browse Courses",
    path: "/courses",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  }
]


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/api.ts

// Type definitions for request body and response data (optional)
interface RequestBody {
  [key: string]: any; // This can be replaced with a more specific type if you know the body structure
}

interface ApiResponse {
  [key: string]: any; // This can be replaced with a more specific type depending on your API response
}

/**
 * Utility function to make API requests.
 * @param {string} endpoint - The API endpoint (without the backend URL prefix).
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {RequestBody} [body] - The body of the request (for POST/PUT requests).
 * @returns {Promise<ApiResponse>} - Returns the response data.
 */
export const fetchFromAPI = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: RequestBody
): Promise<ApiResponse> => {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error('Backend URL is not defined in environment variables.');
  }

  const url = `${backendUrl}${endpoint}`;
  console.log(url)

  // Prepare headers for the request
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // You can add other headers like Authorization here
    // 'Authorization': `Bearer ${yourToken}`
  };

  // Prepare the request options
  const options: RequestInit = {
    method,
    headers,
  };

  // Add body to request if it's a POST or PUT method
  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch from API: ${response.statusText}`);
    }

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
