export const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    
    return parts.map(p => p.charAt(0)).join('');
}