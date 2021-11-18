export interface QrCodeRequest {
    // Basic Parameters
    // 'access-token':	string; // Required => Get it from Account > API
    qr_code_text: string; // Required => What you like to encode
    image_format?: 'JPG' | 'PNG' | 'SVG' | 'EPS'; // default: SVG => The output file format for your QR Code. There are different formats available. Possible values: JPG, PNG, SVG, EPS
    image_width?: number; // default: 500 => Output size in Pixel only supported for PNG and JPG Format
    download?: 0 | 1; // default: 0 => 0 = Return data, 1 = Send data to browser
    // Design Parameters
    foreground_color?: string; // default: #000000 => Foreground color in format #RRGGBB.
    background_color?: string; // default: #FFFFFF => Background color in format #RRGGBB.
    marker_left_inner_color?: string; // default: #000000 => Inner color of the top-left position marker.
    marker_left_outer_color?: string; // default: #000000 => Outer color of the top-left position marker.
    marker_right_inner_color?: string; // default: #000000 => Inner color of the top-right marker.
    marker_right_outer_color?: string; // default: #000000 => Outer color of the top-right marker.
    marker_bottom_inner_color?: string; // default: #000000 => Inner color of the bottom-left marker.
    marker_bottom_outer_color?: string; // default: #000000 => Outer color of the bottom-left marker.
    marker_left_template?: string; // default: version1 => version[1-16]
    marker_right_template?: string; // default: version1 => version[1-16]
    marker_bottom_template?: string; // default: version1 => version[1-16]
    // Frame Parameters
    frame_color?: string; // default: #000000 => Frame color in format #RRGGBB, e.g. #0000aa.
    frame_text?: string; // => Any label to display it close to the icon
    frame_text_color?: string; // default: #ffffff => Text and icon color in format #RRGGBB, e.g. #00ff00.
    frame_icon_name?: 'app' | 'business' | 'coupon' | 'event' | 'facebook' | 'feedback' | 'gallery' | 'mobile' | 'mp3' | 'pdf' | 'rating' | 'social' | 'url' | 'vcard' | 'video';
    frame_name: 'no-frame' | 'bottom-frame' | 'bottom-tooltip' | 'top-header';
}
