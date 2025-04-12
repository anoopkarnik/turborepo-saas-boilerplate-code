//Base Interfaces for Auth Components

export interface QuoteProps {
    quote: string,
    author: string,
    credential: string
}

export interface DataResultProps {
    success?: string | undefined;
    error?: string | undefined;
}


export interface LoadingCardProps {
    title?: string;
    description?: string;
}


export interface FormResultProps{
    type: 'error' | 'success',
    message?: string;
}

//IC Interfaces for Auth Components
export interface LoginCardProps {
    showEmail?: boolean;
    showGoogleProvider?: boolean;
    showGithubProvider?: boolean;
    showLinkedinProvider?: boolean;
    onEmailSubmit?: any;
    onGoogleProviderSubmit?: any;
    onGithubProviderSubmit?: any;
    onLinkedinProviderSubmit?: any;
    errorMessage?:string;
  }
  

export interface RegisterCardProps {
    showEmail?: boolean;
    showGoogleProvider?: boolean;
    showGithubProvider?: boolean;
    showLinkedinProvider?: boolean;
    onEmailSubmit?: any;
    onGoogleProviderSubmit?: any;
    onGithubProviderSubmit?: any;
    onLinkedinProviderSubmit?: any;
    errorMessage?:string;
  }

export interface VerificationCardProps {
    errorMessage?:string;  
    successMessage?:string;
    token?: string;
    resetFunction?:any;
}

export interface ResetPasswordCardProps {
    errorMessage?:string;  
    successMessage?:string;
    token?: string;
    resetFunction?:any;
}



export interface ForgotPasswordCardProps {
    errorMessage?:string;  
    successMessage?:string;
    resetFunction?:any; 
  }

 export interface ErrorCardProps {
    errorMessage?:string;
  }