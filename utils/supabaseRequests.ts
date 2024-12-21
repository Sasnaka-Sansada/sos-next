import { supabaseClient } from "./supabaseClient";
import { createClient } from "./supabase/server";
import { create } from "domain";
import { get } from "http";

// export const getProfile = async({ userId, token }: { userId: string; token: string }) => {
//     const supabase = await supabaseClient(token);
//     const { data, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//     if (error) throw error;
//     return data;
// }

// export const addProfileData = async({ userId, token, event }: { userId: string; token: string; event: any }) => {
//     const supabase = await supabaseClient(token);
//     const [data, error] = await supabase.from('volunteers').insert({
//         id: userId,
//         name: event.target[0].value,
//     })
// }

export const addSeminarData = async(formData: any) => {

    const supabase = await supabaseClient();
    const response = await supabase.from('seminars').insert({
        school: formData.school,
        location: formData.location,
        sub_group: formData.subGroup,
        date: formData.date,
        contact_detail: formData.contactDetails,
        slots_count: formData.remainingSlots,
    });

    if (response.error) throw response.error;
    return response.data;
}

export const getSeminarData = async() => {
    const supabase = await supabaseClient();
    const { data, error } = await supabase.from('seminars').select('*');
    if (error) throw error;
    return data;
}

export const getUpcomingSeminarData = async() => {
    const supabase = await supabaseClient();
    const { data, error } = await supabase.from('seminars').select('*').gt('date', new Date().toISOString());
    if (error) throw error;
    return data;
}

export const getAttendedSeminarData = async() => {
    const supabase = await supabaseClient();
    const { data, error } = await supabase.from('seminars').select('*').lt('date', new Date().toISOString());
    if (error) throw error;
    return data;
}

