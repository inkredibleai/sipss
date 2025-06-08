import { supabase } from './client'
import type { CareerResource, NewCareerResource } from './types'

export async function fetchCareerResources() {
  const { data, error } = await supabase
    .from('career_resources')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createCareerResource(resource: NewCareerResource) {
  const { data, error } = await supabase
    .from('career_resources')
    .insert([{ 
      ...resource, 
      status: 'active',
      views: 0,
      rating: 0
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCareerResource(id: string, resource: Partial<CareerResource>) {
  const { data, error } = await supabase
    .from('career_resources')
    .update(resource)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCareerResource(id: string) {
  const { error } = await supabase
    .from('career_resources')
    .update({ status: 'deleted' })
    .eq('id', id)

  if (error) throw error
}

export async function getCareerResourceById(id: string) {
  const { data, error } = await supabase
    .from('career_resources')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
