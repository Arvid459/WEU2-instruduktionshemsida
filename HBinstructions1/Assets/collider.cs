// Optionally attach this for debugging
using UnityEngine;

public class CarEnterZone : MonoBehaviour
{
    public CarController carController;

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            carController.ShowEnterPrompt(true); // Show a UI hint like "Press E to enter"
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            carController.ShowEnterPrompt(false); // Hide UI
        }
    }
}
